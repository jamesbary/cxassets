import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Support`,
};

export default function Page() {
  return redirect("/support/faqs");
}
