"use client";

import type { User } from "next-auth";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "@/components/shared/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import i18nConfig from "@/i18nConfig";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const languageMapping = {
  en: { fullName: "English", flag: "EN" as Icons },
  es: { fullName: "Español", flag: "ES" as Icons },
  ro: { fullName: "Română", flag: "RO" as Icons },
  bg: { fullName: "Български", flag: "BG" as Icons },
  it: { fullName: "Italiano", flag: "IT" as Icons },
  de: { fullName: "Deutsch", flag: "DE" as Icons },
  "zh-CN": { fullName: "中文（简体）", flag: "CN" as Icons },
};

const SelectLanguage = ({ user }: { user?: User }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: string) => {
    const newLocale = value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };
  return (
    <Select defaultValue={currentLocale} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "h-10 rounded-sm",
          user ? "" : "lg:border-primary lg:rounded-r-none"
        )}
      >
        <SelectValue placeholder="lang" />
      </SelectTrigger>
      <SelectContent>
        {i18nConfig.locales.map((locale) => {
          // const { fullName, flag } = languageMapping[locale];
          const { fullName, flag } =
            languageMapping[locale as keyof typeof languageMapping];
          const FlagIcon = Icons[flag]; // Dynamically get the icon component
          return (
            <SelectItem key={locale} value={locale}>
              <div className="flex items-center gap-1.5">
                <FlagIcon className="size-4" />
                <span className="lg:hidden">{flag}</span>
                <span className="hidden lg:block">{fullName}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export { SelectLanguage };
