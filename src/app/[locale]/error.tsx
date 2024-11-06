"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container grid items-center px-6 py-24 sm:py-32 lg:px-8 gap-4 text-center">
      <h2>{t("error.title")}</h2>
      <div className="flex items-center justify-center gap-x-6">
        <Button onClick={() => reset()}>{t("error.retry")}</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          {t("error.toHome")}
        </Link>
      </div>
    </section>
  );
}
