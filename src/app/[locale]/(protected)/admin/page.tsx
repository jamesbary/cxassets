import { Admin } from "@/app/[locale]/(protected)/admin/_components/admin";
import { getUsers } from "@/lib/queries/user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const users = await getUsers();
  return <Admin users={users} />;
}
