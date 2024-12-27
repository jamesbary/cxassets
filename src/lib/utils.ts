import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import {
  businessAccounts,
  personalCheckingAccounts,
  personalSavingsAccounts,
} from "@/db/schema";
import type {
  AccountTable,
  AdminUser,
  Group,
  MainNavItem,
  NavItemType,
  NavItemWithChildren,
  NavItemWithOptionalChildren,
  SideNavItem,
  SidebarNavItem,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PASSWORD_KEY_LENGTH = 64;
const PIN_KEY_LENGTH = 32;

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .scryptSync(password, salt, PASSWORD_KEY_LENGTH)
    .toString("hex");
  return `${salt}:${hashedPassword}`;
};

export const verifyPassword = (password: string, hash: string): boolean => {
  const [salt, hashedPassword] = hash.split(":");
  const hashedBuffer = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH);

  return crypto.timingSafeEqual(
    Buffer.from(hashedPassword, "hex"),
    hashedBuffer
  );
};

export const hashPin = (pin: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPin = crypto
    .scryptSync(pin, salt, PIN_KEY_LENGTH)
    .toString("hex");
  return `${salt}:${hashedPin}`;
};

export const verifyPin = (pin: string, hash: string): boolean => {
  const [salt, hashedPin] = hash.split(":");
  const hashedBuffer = crypto.scryptSync(pin, salt, PIN_KEY_LENGTH);

  return crypto.timingSafeEqual(Buffer.from(hashedPin, "hex"), hashedBuffer);
};

export const getInitials = (name?: string | null): string => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const mapNavItems = (items: NavItemType[]): NavItemWithChildren[] => {
  return items
    .filter((item) => "items" in item && Array.isArray(item.items))
    .map((item) => {
      let nestedItems: NavItemWithChildren[] = [];

      if ("items" in item && Array.isArray(item.items)) {
        nestedItems = mapNavItems(item.items);
      }

      return {
        ...item,
        items: nestedItems,
      };
    });
};

export const mapSidebarToDashboard = (
  sidebarItems: SideNavItem[]
): SidebarNavItem[] => {
  return sidebarItems.map((item) => ({
    title: item.name,
    href: item.href,
    icon: item.icon,
    items: [],
  }));
};

export const addHrefProperties = (
  translatedItems: NavItemWithOptionalChildren[],
  originalItems: MainNavItem[]
): MainNavItem[] => {
  return translatedItems.map((item, index) => {
    const originalItem = originalItems[index];

    return {
      title: item.title,
      href: originalItem.href,
      items: item.items
        ? addHrefProperties(item.items, originalItem.items || [])
        : [],
    };
  });
};

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast.error(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error("Something went wrong, please try again later.");
  }
}

export function formatAmount(
  amount: number | string,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "standard",
    ...options,
  }).format(Number(amount));
}

export function categorizeUsersIntoGroups(users: AdminUser[]) {
  const categorizedUsers: Record<string, Array<Group>> = {
    Administrators: [],
    Users: [],
  };

  users.forEach((user) => {
    if (user.role === "admin") {
      categorizedUsers.Administrators.push({
        label: user.name,
        value: user.id,
        src: user.image ?? "",
      });
    } else if (user.role === "user") {
      categorizedUsers.Users.push({
        label: user.name,
        value: user.id,
        src: user.image ?? "",
      });
    }
  });

  const groups = [
    {
      label: "Administrators",
      teams: categorizedUsers.Administrators,
    },
    {
      label: "Users",
      teams: categorizedUsers.Users,
    },
  ];

  return groups;
}

export function userMetrics(id: string, users: AdminUser[]) {
  const user = users.find((user) => user.id === id);

  if (!user) return;

  return user;
}

export const getAccountTable = (account: string): AccountTable => {
  switch (account) {
    case "personalCheckingAccounts":
      return personalCheckingAccounts;
    case "personalSavingsAccounts":
      return personalSavingsAccounts;
    case "businessAccounts":
      return businessAccounts;
    default:
      throw new Error(`Unknown account type: ${account}`);
  }
};

export const generateAccountNumber = () => {
  const array = new Uint32Array(3); // Adjust size as needed
  crypto.getRandomValues(array);

  // Convert each number in the array to a string, concatenate them, and trim to 12 digits
  const accountNumber = Array.from(array, (num) => num.toString())
    .join("")
    .substring(0, 12);

  return accountNumber;
};
