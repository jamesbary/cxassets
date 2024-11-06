import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { routeId: string };
}) {
  redirect("/personal");
}
