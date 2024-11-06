import { EmailForm } from "@/components/shared/new-email-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLElement> & {
  about_us: { title: string; desc: string; more: string };
  support: { title: string; desc: string; more: string };
  placeholder: {
    email: string;
    message: string;
    send: string;
    success: string;
  };
};
const FooterSection = ({
  about_us,
  support,
  placeholder,
  className,
  ...props
}: Props) => {
  return (
    <section
      className={cn(
        "container grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
        className
      )}
      {...props}
    >
      <section className="space-y-2.5">
        <div className="space-y-1">
          <h3 className="text-brand text-lg md:text-xl font-semibold tracking-tight">
            {/* {about_us.title} */}
            Personal
          </h3>
          <p className="text-xs leading-normal text-muted-foreground sm:text-sm line-clamp-4">
            {about_us.desc}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={"/about"}
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                className: "w-min pl-0 h-auto py-1",
              })
            )}
          >
            {about_us.more}
            <MoveRightIcon className="ml-2 size-4" aria-hidden="true" />
            <span className="sr-only">About</span>
          </Link>
        </div>
      </section>
      <section className="space-y-2.5">
        <div className="space-y-1">
          {/* <h2 className="text-xl">{support.title}</h2> */}
          <h3 className="text-brand text-lg md:text-xl font-semibold tracking-tight">
            Business
          </h3>
          <p className="text-xs leading-normal text-muted-foreground sm:text-sm">
            {support.desc}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={"/support/faqs"}
            className={cn(
              buttonVariants({
                size: "sm",
                className: "w-min pl-0 h-auto py-1",
                variant: "link",
              })
            )}
          >
            {support.more}
          </Link>
        </div>
      </section>
      <EmailForm
        placeholder={placeholder}
        className="sm:col-span-2 lg:col-span-1"
      />
    </section>
  );
};

export { FooterSection };
