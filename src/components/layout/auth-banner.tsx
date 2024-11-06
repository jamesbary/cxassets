import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import { appConfig } from "@/config";

const AuthBanner = () => {
  return (
    <section
      className={"bg-[url('/assets/hero/banner-1.jpeg')] bg-cover bg-center"}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
      <Link
        href="/"
        className="absolute left-4 sm:left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
        <span className="hidden xx:block">{appConfig.name}</span>
      </Link>
    </section>
  );
};

export { AuthBanner };
