import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const transactionStatus = pgEnum("transactionStatus", [
  "success",
  "pending",
  "rejected",
]);
export const transactionType = pgEnum("transactionType", [
  "fund",
  "transfer",
  "withdrawal",
]);
export const accountType = pgEnum("accountType", [
  "personalCheckingAccounts",
  "personalSavingsAccounts",
  "businessAccounts",
]);
export const status = pgEnum("status", ["active", "closed"]);

export const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  ipCountry: text("ipCountry"),
  username: text("username").unique(),
  role: roleEnum("role").default("user").notNull(),
  balance: decimal("balance", { precision: 19, scale: 2 })
    .notNull()
    .default("0"),
  password: text("password"),
  pin: varchar("pin", { length: 6 }),
  hashedPin: text("hashedPin"),
  country: varchar("country", { length: 255 }),
  status: status("status").notNull().default("active"),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  transactions: many(transactions),
  personalCheckingAccount: one(personalCheckingAccounts, {
    fields: [users.id],
    references: [personalCheckingAccounts.userId],
  }),
  personalSavingsAccount: one(personalSavingsAccounts, {
    fields: [users.id],
    references: [personalSavingsAccounts.userId],
  }),
  businessAccount: one(businessAccounts, {
    fields: [users.id],
    references: [businessAccounts.userId],
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    userIdIdx: index().on(account.userId),
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const transactions = pgTable("transaction", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 19, scale: 2 }).notNull().default("0"),
  type: transactionType("type").notNull(),
  status: transactionStatus("status").notNull().default("pending"),
  account: accountType("account").notNull().default("personalCheckingAccounts"),
  accountId: uuid("accountId").notNull(),
  description: varchar("description", { length: 255 }),
  date: timestamp("date").notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  customer: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const personalCheckingAccounts = pgTable(
  "personalCheckingAccount",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    number: varchar("number", { length: 20 }).notNull().unique(),
    balance: decimal("balance", { precision: 19, scale: 2 })
      .notNull()
      .default("0"),
    status: status("status").notNull().default("active"),
    limit: decimal("limit", {
      precision: 19,
      scale: 2,
    }).default("0"),
    date: timestamp("date").notNull().defaultNow(),
  },
  (account) => ({ cNumberIdx: index().on(account.number) })
);

export const personalCheckingAccountsRelations = relations(
  personalCheckingAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [personalCheckingAccounts.userId],
      references: [users.id],
    }),
  })
);

export const personalSavingsAccounts = pgTable(
  "personalSavingsAccount",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    number: varchar("number", { length: 20 }).notNull().unique(),
    balance: decimal("balance", { precision: 19, scale: 2 })
      .notNull()
      .default("0"),
    status: status("status").notNull().default("active"),
    interestRate: decimal("interestRate", { precision: 5, scale: 2 }).notNull(),
    withdrawalLimit: integer("withdrawalLimit").notNull().default(3),
    date: timestamp("date").notNull().defaultNow(),
  },
  (account) => ({ sNumberIdx: index().on(account.number) })
);

export const personalSavingsAccountsRelations = relations(
  personalSavingsAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [personalSavingsAccounts.userId],
      references: [users.id],
    }),
  })
);

export const businessAccounts = pgTable(
  "businessAccount",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    number: varchar("number", { length: 20 }).notNull().unique(),
    balance: decimal("balance", { precision: 19, scale: 2 })
      .notNull()
      .default("0"),
    status: status("status").notNull().default("active"),
    businessName: varchar("businessName", { length: 255 }).notNull(),
    businessType: varchar("businessType", { length: 50 }).notNull(),
    date: timestamp("date").notNull().defaultNow(),
  },
  (account) => ({ bNumberIdx: index().on(account.number) })
);

export const businessAccountsRelations = relations(
  businessAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [businessAccounts.userId],
      references: [users.id],
    }),
  })
);

export type User = typeof users.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type CheckingAccount = typeof personalCheckingAccounts.$inferSelect;
export type SavingsAccount = typeof personalSavingsAccounts.$inferSelect;
export type BusinessAccount = typeof businessAccounts.$inferSelect;
