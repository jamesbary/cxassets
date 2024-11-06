import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Signout } from "@/components/auth/signout";
import { Shell } from "@/components/shared/shell";
import { appConfig } from "@/config";
import { getCachedSession } from "@/lib/queries/auth";

export const metadata: Metadata = {
  title: appConfig.auth.signout.title,
  description: appConfig.auth.signout.description,
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getCachedSession();
  if (!session) redirect(appConfig.auth.signin.href);

  return (
    <Shell className="max-w-lg">
      <Signout locale={locale} />
    </Shell>
  );
}
