import { buttonVariants } from "@/components/ui/button";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NotFound } from "@/types/common";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLElement> & { locale: string };

const i18nNamespaces = ["common"];

const Notfound = async ({ locale, className, ...props }: Props) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const translatedNotFound = t("notfound", {
    returnObjects: true,
  }) as NotFound;
  return (
    <section
      className={cn("grid place-content-center gap-2.5", className)}
      {...props}
    >
      <h2>{translatedNotFound.title}</h2>
      <p>{translatedNotFound.desc}</p>
      <Link className={cn(buttonVariants())} href="/">
        {translatedNotFound.toHome}
      </Link>
    </section>
  );
};

export { Notfound };
