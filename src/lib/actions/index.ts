"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { DEFAULT_AUTH_REDIRECT } from "@/config/constants";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  getIP,
  getLocation,
  getUserByEmail,
  getUserByNameOrEmail,
} from "@/lib/queries/user";
import { getAccountTable, hashPassword, verifyPassword } from "@/lib/utils";
import {
  authWithAccountNumberSchema,
  authWithCredentialsSchema,
  emailSchema,
  type AuthWithAccountNumberPayload,
  type EmailPayload,
  type UserPayload,
} from "@/lib/validations/auth";
import { eq } from "drizzle-orm";

export const authenticate = async (input: EmailPayload) => {
  const parsedEmail = emailSchema.safeParse(input);
  if (!parsedEmail.success) return;
  const { email } = parsedEmail.data;

  // Retrieve the user from the database based on the email
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Seems you have not opened account with us!");
  try {
    await signIn("resend", input);
  } catch (error) {
    if (error instanceof AuthError) return error.message;
    throw error;
  }
};

export const unauthenticate = async () => {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) return error.message;
    throw error;
  }
};

export const addUser = async (input: UserPayload) => {
  const { email, password, username } = input;

  const sameEmail = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (model, { eq }) => eq(model.email, email),
  });
  const sameUsername = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (model, { eq }) => eq(model.username, username),
  });

  if (sameEmail) return "email";
  if (sameUsername) return "username";

  const hashedPassword = hashPassword(password);

  const ip = await getIP();
  const data = await getLocation(ip);

  await db.insert(users).values({
    ...input,
    password: hashedPassword,
    ipCountry: data?.country,
  });

  try {
    await signIn("resend", { email });
    return true;
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) return "generic";
    throw error;
  }
};

export const authWithAccountNumber = async (
  input: AuthWithAccountNumberPayload
) => {
  // Parse and validate the input
  const parsedCredentials = authWithAccountNumberSchema.safeParse(input);
  if (!parsedCredentials.success) return null;

  const { number, password, type } = parsedCredentials.data;

  // Retrieve account type schema
  const accountTable = getAccountTable(type);

  // Find the user using the account type table
  const typeUser = (
    await db
      .select({
        user: users,
      })
      .from(accountTable)
      .leftJoin(users, eq(accountTable.userId, users.id))
      .where(eq(accountTable.number, number))
  )[0];

  // Retrieve the user from the database based on the email
  const user = typeUser.user;
  if (!user || !user.password) return null;

  // Check if the password is valid
  // const isPasswordValid = await compare(password, user.password);
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

export const authWithCredentials = async (
  credentials: Partial<Record<"nameOrEmail" | "password", string>>
) => {
  // Parse and validate the input
  const parsedCredentials = authWithCredentialsSchema.safeParse(credentials);
  if (!parsedCredentials.success) return null;

  const { nameOrEmail, password } = parsedCredentials.data;

  // Retrieve the user from the database based on the email
  const user = await getUserByNameOrEmail(nameOrEmail);
  if (!user || !user.password)
    throw new Error("Seems you have not opened account with us!");
  if (!user.emailVerified)
    throw new Error("You must verify your account first before logging in!");

  // Check if the password is valid
  // const isPasswordValid = await compare(password, user.password);
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credenials");

  return user;
};
export const signinCredential = async (
  credentials: Partial<Record<"nameOrEmail" | "password", string>>
) => {
  // Parse and validate the input
  const parsedCredentials = authWithCredentialsSchema.safeParse(credentials);
  if (!parsedCredentials.success) return null;

  const { nameOrEmail, password } = parsedCredentials.data;

  // Retrieve the user from the database based on the username or email
  const user = await getUserByNameOrEmail(nameOrEmail);
  if (!user || !user.password) return "user";
  if (!user.emailVerified) return "verify";

  // Check if the password is valid
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) return "credentials";

  try {
    await signIn("credentials", {
      nameOrEmail,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    });
    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "credentials";
        default:
          return "generic";
      }
    }
    throw error;
  }
};
