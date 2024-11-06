import "server-only";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { transactions, users } from "@/db/schema";
import { catchError } from "@/lib/utils";
import { AccountTable } from "@/types";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getCheckingAcctByUserId = async (userId: string) => {
  return await cache(
    async () => {
      return db.query.personalCheckingAccounts.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });
    },
    ["personal-checking-account"],
    {
      revalidate: 1440, // every 24 minutes
      tags: ["personal-checking-account"],
    }
  );
};

export const getCheckingAcctById = async (id: string) => {
  return await cache(
    async () => {
      return db.query.personalCheckingAccounts.findFirst({
        where: (model, { eq }) => eq(model.id, id),
      });
    },
    [id],
    {
      revalidate: 1440, // every 24 minutes
      tags: [id],
    }
  );
};

export const getSavingsAcctByUserId = async (userId: string) => {
  return await cache(
    async () => {
      return db.query.personalSavingsAccounts.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });
    },
    ["personal-savings-account"],
    {
      revalidate: 1440, // every 24 minutes
      tags: ["personal-savings-account"],
    }
  );
};

export const getSavingsAcctById = async (id: string) => {
  return await cache(
    async () => {
      return db.query.personalSavingsAccounts.findFirst({
        where: (model, { eq }) => eq(model.id, id),
      });
    },
    [id],
    {
      revalidate: 1440, // every 24 minutes
      tags: [id],
    }
  );
};

export const getBusinessAcctByUserId = async (userId: string) => {
  return await cache(
    async () => {
      return db.query.businessAccounts.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });
    },
    ["business-account"],
    {
      revalidate: 1440, // every 24 minutes
      tags: ["business-account"],
    }
  );
};

export const getBusinessAcctById = async (id: string) => {
  return await cache(
    async () => {
      return db.query.businessAccounts.findFirst({
        where: (model, { eq }) => eq(model.id, id),
      });
    },
    [id],
    {
      revalidate: 1440, // every 24 minutes
      tags: [id],
    }
  );
};

export const getUserWithAccounts = async () => {
  const session = await auth();
  if (!session?.user.id) return null;
  const userId = session.user.id;

  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, userId),
      with: {
        personalCheckingAccount: true,
        personalSavingsAccount: true,
        businessAccount: true,
      },
    });
  } catch (err) {
    catchError(err);
  }
};

export const getAccounts = async () => {
  const session = await auth();

  if (!session?.user.id) redirect("/signin?callbackUrl=/dashboard");

  const userId = session.user.id;

  noStore();
  try {
    const result = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, userId),
      with: {
        personalCheckingAccount: true,
        personalSavingsAccount: true,
        businessAccount: true,
      },
    });

    // if (!result) return null;

    const checkingAccount = result?.personalCheckingAccount;
    const savingsAccount = result?.personalSavingsAccount;
    const businessAccount = result?.businessAccount;

    return { checkingAccount, savingsAccount, businessAccount };
  } catch (error) {
    throw error;
  }
};

export const getTransactions = async () => {
  noStore();
  try {
    return await db
      .select({
        date: transactions.date,
        id: transactions.id,
        userId: transactions.userId,
        amount: transactions.amount,
        type: transactions.type,
        status: transactions.status,
        description: transactions.description,
        name: users.name,
      })
      .from(transactions)
      .leftJoin(users, eq(transactions.userId, users.id))
      .orderBy(desc(transactions.date));
  } catch (error) {
    throw error;
  }
};

export const getUserTransactions = async () => {
  const session = await auth();

  if (!session?.user.id) redirect("/signin?callbackUrl=/dashboard/transfer");

  const userId = session.user.id;

  noStore();
  try {
    return await db
      .select({
        date: transactions.date,
        id: transactions.id,
        userId: transactions.userId,
        amount: transactions.amount,
        type: transactions.type,
        status: transactions.status,
        description: transactions.description,
        name: users.name,
      })
      .from(transactions)
      .leftJoin(users, eq(transactions.userId, users.id))
      .orderBy(desc(transactions.date))
      .where(eq(transactions.userId, userId));
  } catch (error) {
    throw error;
  }
};

export const getAccountById = async (table: AccountTable, userId: string) => {
  noStore();
  try {
    const account = await db
      .select()
      .from(table)
      .where(eq(table.userId, userId));
    return account[0];
  } catch (error) {
    throw error;
  }
};
