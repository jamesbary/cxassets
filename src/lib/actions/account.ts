"use server";

import { auth } from "@/auth";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { db } from "@/db";
import {
  businessAccounts,
  personalCheckingAccounts,
  personalSavingsAccounts,
  SavingsAccount,
  transactions,
  users,
} from "@/db/schema";
import { getAccountById } from "@/lib/queries/account";
import { generateAccountNumber, getAccountTable, verifyPin } from "@/lib/utils";
import {
  businessAccountSchema,
  type BusinessAccountPayload,
} from "@/lib/validations/account";
import {
  type AccountPayload,
  type BankPayload,
  type TransactionPayload,
} from "@/lib/validations/transaction";
import { AccountTable } from "@/types";

// Function to check if a user already has an account of a specific type

const checkExistingAccount = async (table: AccountTable, userId: string) => {
  const existingAccount = await db
    .select()
    .from(table)
    .where(eq(table.userId, userId))
    .limit(1);
  return existingAccount.length > 0;
};

const updateAccount = async (
  table: AccountTable,
  amount: string,
  number: string
) => {
  const account = await db.select().from(table).where(eq(table.number, number));

  const newBalance = parseFloat(account[0].balance) + parseFloat(amount);
  await db
    .update(table)
    .set({
      balance: String(newBalance),
    })
    .where(eq(table.number, number));
};

export const createCheckingAccount = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;

  if (await checkExistingAccount(personalCheckingAccounts, userId))
    // throw new Error("User already has a personal checking account");
    return "exists";

  const accountNumber = generateAccountNumber();
  const overdraft_limit = "2000";

  await db.insert(personalCheckingAccounts).values({
    userId,
    number: accountNumber,
    limit: overdraft_limit,
  });

  revalidatePath(appConfig.entry.href);
  return true;
};

export const createSavingsAccount = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;
  const accountNumber = generateAccountNumber();
  const max_monthly_withdrawal = 3;
  const interest_rate = "10";

  if (await checkExistingAccount(personalSavingsAccounts, userId))
    // throw new Error("User already has a personal savings account");
    return "exists";

  await db.insert(personalSavingsAccounts).values({
    userId,
    number: accountNumber,
    interestRate: interest_rate,
    withdrawalLimit: max_monthly_withdrawal,
  });

  revalidatePath(appConfig.entry.href);
  return true;
};

export const createBusinessAccount = async (input: BusinessAccountPayload) => {
  const parsedInput = businessAccountSchema.safeParse(input);
  if (!parsedInput.success) return;

  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;
  const accountNumber = generateAccountNumber();

  if (await checkExistingAccount(businessAccounts, userId))
    // throw new Error("User already has a business account");
    return "exists";

  await db.insert(businessAccounts).values({
    userId,
    number: accountNumber,
    ...parsedInput.data,
  });

  revalidatePath(appConfig.entry.href);
  return true;
};

export const transact = async (input: TransactionPayload) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;

  if (input.type === "fund") {
    await db.insert(transactions).values({
      account: input.account,
      accountId: input.accountId,
      type: input.type,
      userId,
      amount: input.amount,
      status: "pending",
      description: input.description,
    });
  }
  if (input.type === "transfer") {
    const accountTable = getAccountTable(input.account);
    const sourceTable = await getAccountById(accountTable, userId);

    if (!input.number) {
      throw new Error("Account number is required for transfer transactions");
    }
    if (sourceTable.balance < input.amount) {
      throw new Error(
        "You do not have enough money in your account for this transfer"
      );
    }
    await updateAccount(accountTable, `-${input.amount}`, sourceTable.number);
    await updateAccount(accountTable, input.amount, input.number);

    await db.insert(transactions).values({
      account: input.account,
      accountId: input.accountId,
      type: input.type,
      userId,
      amount: input.amount,
      status: "success",
    });
  }

  revalidatePath(appConfig.entry.href);
};

export const fund = async (input: AccountPayload) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);
  if (session.user.role !== "admin") redirect(appConfig.entry.href);

  const userId = session.user.id;

  const accountTable = getAccountTable(input.type);
  await updateAccount(accountTable, input.amount, input.number);

  await db.insert(transactions).values({
    account: input.type,
    accountId: input.accountId,
    type: "fund",
    userId,
    amount: input.amount,
    status: "success",
  });
  revalidatePath(appConfig.entry.href);
  revalidatePath("/admin");
};

export const transfer = async (input: AccountPayload) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;

  const accountTable = getAccountTable(input.type);

  const receiverAccount = await db
    .select()
    .from(accountTable)
    .where(eq(accountTable.number, input.number));

  const sourceTable = await db
    .select()
    .from(accountTable)
    .where(eq(accountTable.id, input.accountId));

  if (!receiverAccount.length) return "exist";
  if (!sourceTable.length) return "exist";

  if (parseFloat(sourceTable[0].balance) < parseFloat(input.amount))
    return "enough";

  const newSourceBalance =
    parseFloat(sourceTable[0].balance) - parseFloat(input.amount);
  await db
    .update(accountTable)
    .set({
      balance: String(newSourceBalance),
    })
    .where(eq(accountTable.id, input.accountId));

  await updateAccount(accountTable, input.amount, input.number);
  await db.insert(transactions).values({
    account: input.type,
    accountId: input.accountId,
    type: "transfer",
    userId,
    amount: input.amount,
    status: "success",
  });

  revalidatePath(appConfig.entry.href);
  return true;
};

export const withdraw = async (input: BankPayload) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  const userId = session.user.id;

  // First verify PIN
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user.length || !user[0].hashedPin) return "no_pin";

  const isPinValid = verifyPin(input.pin, user[0].hashedPin);
  if (!isPinValid) return "invalid_pin";

  // Withdrawal function
  const accountTable = getAccountTable(input.type);

  const sourceTable = await db
    .select()
    .from(accountTable)
    .where(eq(accountTable.id, input.accountId));

  if (!sourceTable.length) return "exist";

  const accountData = sourceTable[0];
  const currentBalance = parseFloat(accountData.balance);

  if (currentBalance < parseFloat(input.amount)) return "enough";

  // Enforce withdrawal limit for personal savings accounts
  if (accountTable === personalSavingsAccounts) {
    const savingsData = sourceTable[0] as SavingsAccount;
    const withdrawalLimit = savingsData.withdrawalLimit;

    // Get the current date details
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
    const currentYear = now.getFullYear();

    // Count withdrawals for the current month
    // const monthlyWithdrawals = await db
    //   .select({
    //     count: sql<number>`COUNT(*)`,
    //   })
    //   .from(transactions)
    //   .where(
    //     and(
    //       eq(transactions.accountId, input.accountId),
    //       eq(transactions.type, "withdrawal"),
    //       eq(transactions.userId, userId),
    //       sql`EXTRACT(MONTH FROM ${transactions.date}) = ${currentMonth}`,
    //       sql`EXTRACT(YEAR FROM ${transactions.date}) = ${currentYear}`
    //     )
    //   );

    // const withdrawalsCount = monthlyWithdrawals[0]?.count || 0;

    // Count withdrawals for the current day
    const dailyWithdrawals = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.accountId, input.accountId),
          eq(transactions.type, "withdrawal"),
          eq(transactions.userId, userId),
          sql`EXTRACT(DAY FROM ${transactions.date}) = ${currentDay}`,
          sql`EXTRACT(MONTH FROM ${transactions.date}) = ${currentMonth}`,
          sql`EXTRACT(YEAR FROM ${transactions.date}) = ${currentYear}`
        )
      );

    const withdrawalsCount = dailyWithdrawals[0]?.count || 0;

    // Prevent withdrawal if limit is exceeded
    if (withdrawalsCount >= withdrawalLimit) return "day";
  }

  const newSourceBalance = currentBalance - parseFloat(input.amount);
  await db
    .update(accountTable)
    .set({
      balance: String(newSourceBalance),
    })
    .where(eq(accountTable.id, input.accountId));

  await db.insert(transactions).values({
    account: input.type,
    accountId: input.accountId,
    type: "withdrawal",
    userId,
    amount: input.amount,
    status: "success",
    description: `Bank: ${input.bank}; Account Name: ${input.name}; Bank Number: ${input.number}`,
  });

  revalidatePath(appConfig.entry.href);
  return true;
};
