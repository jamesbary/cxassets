import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/providers/theme";
import TranslationsProvider from "@/components/providers/translation";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/config";
import { fontSans } from "@/lib/fonts";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: appConfig.name, template: `${appConfig.name} ~ %s` },
  description: appConfig.description,
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "Investment Platform",
    "Digital Banking",
  ],
  icons: [
    { rel: "icon", url: "/favicon.svg" },
    { rel: "icon", url: "/favicon.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ["common"];
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <head />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            {children}
          </TranslationsProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
