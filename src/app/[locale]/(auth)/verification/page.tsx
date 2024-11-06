import type { Metadata } from "next";

import { Verify } from "@/components/auth/verify";
import { Shell } from "@/components/shared/shell";
import { appConfig } from "@/config";

export const metadata: Metadata = {
  title: appConfig.auth.verification.title,
  description: appConfig.auth.verification.description,
};

export default async function AuthVerificationPage({
  searchParams,
  params: { locale },
}: {
  searchParams: { [key: string]: string | undefined };
  params: { locale: string };
}) {
  const token = searchParams.token;
  return (
    <Shell className="max-w-lg">
      <Verify token={token} locale={locale} />
    </Shell>
  );
}
