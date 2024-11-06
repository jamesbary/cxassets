"use server";

import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { db } from "@/db";
import { users } from "@/db/schema";

export const updateImage = async (url: string) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);

  await db
    .update(users)
    .set({ image: url })
    .where(eq(users.id, session.user.id));

  revalidatePath(appConfig.entry.href);
};

export const updateIpCountry = async (id: string, country?: string) => {
  if (!country) return null;
  await db.update(users).set({ ipCountry: country }).where(eq(users.id, id));
};

export const deleteUser = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);
  if (session.user.role !== "admin")
    throw new Error(
      "You do not have permission or the authorization level for this action!"
    );

  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/admin");
};

export const giveAccess = async (id: string, status: "active" | "closed") => {
  const session = await auth();
  if (!session?.user?.id) redirect(appConfig.auth.signin.href);
  if (session.user.role !== "admin")
    throw new Error(
      "You do not have permission or the authorization level for this action!"
    );

  await db.update(users).set({ status }).where(eq(users.id, id));
  revalidatePath("/admin");
};
