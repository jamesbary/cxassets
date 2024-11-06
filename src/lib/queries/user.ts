import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";

export const getUserByUsername = async (username: string) => {
  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.username, username),
    });
  } catch {
    return null;
  }
};

export const getUserByNameOrEmail = async (input: string) => {
  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq, or }) =>
        or(eq(model.username, input), eq(model.email, input)),
    });
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.email, email),
    });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });
  } catch {
    return null;
  }
};

export const getUser = async () => {
  const session = await auth();
  if (!session?.user.id) return null;
  const userId = session.user.id;

  noStore();
  try {
    return await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, userId),
    });
  } catch {
    return null;
  }
};

export const getUsers = async () => {
  noStore();
  try {
    const users = await db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        image: true,
        role: true,
        country: true,
        email: true,
        username: true,
        ipCountry: true,
        status: true,
      },
      with: {
        businessAccount: true,
        personalCheckingAccount: true,
        personalSavingsAccount: true,
        transactions: true,
      },
    });
    return users;
  } catch (error) {
    // console.log({ error });
    throw error;
  }
};

// export const getIP = async () => {
//   const res = await fetch("https://api.ipify.org");
//   return res.text();
// };
export const getIP = async () => {
  noStore();
  try {
    const res = await fetch("https://api.ipify.org");
    // const res = await fetch("https://api.ipify.org", { cache: "no-store" });
    if (!res.ok) throw new Error("Network response was not ok");
    return res.text();
  } catch (error) {
    console.error("Failed to get IP:", error);
    return null; // Fallback or handle accordingly
  }
};

// export const getLocation = async (ip: string) => {
//   const res = await fetch(`http://ip-api.com/json/${ip}`);
//   return res.json();
// };
export const getLocation = async (
  ip: string | null
): Promise<{
  country_3: string;
  name: string;
  country: string;
  ip: string;
} | null> => {
  if (!ip) return null; // Early return if IP is not available
  noStore();
  try {
    const res = await fetch(`https://get.geojs.io/v1/ip/country/${ip}.json`);
    // const res = await fetch(`http://ip-api.com/json/${ip}`, {
    //   cache: "no-store",
    // });
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  } catch (error) {
    console.error("Failed to get location:", error);
    return null; // Fallback or handle accordingly
  }
};
