import type { Metadata } from "next";

import { Signin } from "@/components/auth/signin";
import { Shell } from "@/components/shared/shell";
import { appConfig } from "@/config";
import { getCachedSession } from "@/lib/queries/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: appConfig.auth.signin.title,
  description: appConfig.auth.signin.description,
};

export default async function SigninPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getCachedSession();
  if (session?.user) redirect(appConfig.entry.href);
  return (
    <Shell className="max-w-lg">
      <Signin locale={locale} />
    </Shell>
  );
}
