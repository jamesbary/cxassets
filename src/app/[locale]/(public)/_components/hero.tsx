import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";

const i18nNamespaces = ["home"];

interface HeroData {
  heading: string;
  sub: string;
  action: string;
  more: string;
}
const Hero = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const heroData = t("hero", { returnObjects: true }) as HeroData;

  return (
    <section className="relative w-full pb-20 md:pb-24 lg:pb-28 pt-52 md:pt-56 lg:pt-60 md:min-h-[75vh] flex items-center px-4 sm:px-8 -mt-32">
      <Image
        src="/assets/hero/long-3.jpeg"
        alt="hero image"
        fill
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-slate-800/70" />
      <div className="container relative z-10 h-full text-center space-y-4 max-w-screen-lg bg-slate-800/40 rounded-md p-4 sm:p-6 md:p-8">
        <h1 className="max-w-5xl mx-auto text-light text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-violet-500">
            {appConfig.name}
          </span>{" "}
          {heroData.heading}
        </h1>
        <p className="text-base text-light sm:text-lg text-balance">
          {heroData.sub}
        </p>
        <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center justify-center">
          <Link
            href={appConfig.entry.href}
            className={cn(
              "min-w-fit",
              buttonVariants({
                size: "cm",
                className:
                  "bg-brand text-foreground font-semibold lg:text-base hover:bg-brand/85",
              })
            )}
          >
            {heroData.action}
          </Link>
          <Link
            href="#features"
            className={cn(
              "min-w-fit",
              buttonVariants({
                size: "cm",
                className:
                  "bg-purple-400 text-foreground font-semibold lg:text-base hover:bg-purple-400/85",
              })
            )}
          >
            {heroData.more}
          </Link>
        </div>
      </div>
    </section>
  );
};

export { Hero };
