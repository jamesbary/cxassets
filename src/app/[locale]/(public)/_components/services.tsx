import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ServicesProps = {
  locale: string;
};

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const i18nNamespaces = ["home"];

const Services = async ({ locale }: ServicesProps) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const translatedServices = t("services", { returnObjects: true }) as Omit<
    Service,
    "icon" | "href"
  >[];
  const services: Service[] = translatedServices.map((feature, index) => ({
    ...feature,
    icon: ["user", "briefcase", "dollarSign", "mortgage"][index],
    href: ["/personal", "/business", "/lending", "/mortgage"][index],
  }));

  return (
    <section className="relative z-10 bg-slate-800/85">
      <div className="container py-8 sm:py-16 grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const ico = service.icon as Icons;
          const Icon = Icons[ico];
          return (
            <Card
              key={service.title}
              className="flex flex-col bg-slate-800/85 border-brand"
            >
              <CardHeader className="pb-3 sm:pb-3 items-center text-brand text-center">
                <CardDescription className="border border-brand rounded-full p-2.5 text-brand">
                  <Icon className="size-8" />
                </CardDescription>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="sm:text-base text-center text-balance line-clamp-6 text-light/85">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link
                  href={service.href}
                  className={cn(
                    buttonVariants({
                      className: "w-full bg-brand hover:bg-brand/85",
                    })
                  )}
                >
                  {t("hero.more")}
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export { Services };
