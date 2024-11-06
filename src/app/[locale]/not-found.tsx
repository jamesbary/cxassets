import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid place-items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={cn(buttonVariants())} href="/">
        Back to home
      </Link>
    </section>
  );
}
