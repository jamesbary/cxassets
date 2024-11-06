import type { Metadata } from "next";

import { Signup } from "@/components/auth/signup";
import { Shell } from "@/components/shared/shell";
import { appConfig } from "@/config";
import { getCachedSession } from "@/lib/queries/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: appConfig.auth.signup.title,
  description: appConfig.auth.signup.description,
};

export default async function RegisterPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getCachedSession();
  if (session?.user) redirect(appConfig.entry.href);
  return (
    <Shell className="max-w-lg">
      <Signup locale={locale} />
    </Shell>
  );
}
