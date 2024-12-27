import { appConfig } from "@/config";
import type { Metadata } from "next";
// import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: appConfig.auth.onboarding.title,
};

export default async function OnboardingPage() {
  // redirect(appConfig.url);
  return (
    <main>
      <h2>Onboarding</h2>
    </main>
  );
}
