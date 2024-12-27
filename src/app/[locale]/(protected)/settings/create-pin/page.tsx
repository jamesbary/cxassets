import { Create } from "@/app/[locale]/(protected)/settings/create-pin/_components/create";
import { Shell } from "@/components/shared/shell";
import { cn } from "@/lib/utils";
// import { redirect } from "next/navigation";

export default async function CreatePinPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // redirect(appConfig.url);
  return (
    <Shell className={cn("max-w-screen-sm min-h-screen min-h-dvh")}>
      <Create locale={locale} />
    </Shell>
  );
}
