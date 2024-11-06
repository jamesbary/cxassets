import { PageShell } from "@/components/shared/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import type { Faqs } from "@/types/common";

const i18nNamespaces = ["common", "home"];
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const translatedServices = t("faqs", {
    returnObjects: true,
  }) as Faqs;

  return (
    <main>
      <PageShell
        // title="FAQs"
        title={t("support_more", { ns: "home" })}
        bgImage="/assets/hero/banner-1.jpeg"
        contentClassName="container"
      >
        <section className="grid gap-4 lg:gap-6 lg:grid-cols-3">
          {translatedServices.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0">
                  <Accordion
                    type="multiple"
                    defaultValue={item.items.map((item) => item.question)}
                    className="w-full"
                  >
                    {item.items.map((item, index) => (
                      <AccordionItem value={item.question} key={index}>
                        <AccordionTrigger className="text-sm capitalize">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/75">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </section>
      </PageShell>
    </main>
  );
}
