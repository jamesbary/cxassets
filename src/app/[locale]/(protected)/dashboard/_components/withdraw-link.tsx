import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLElement> & { title: string };
const WithdrawLink = ({ title, className, ...props }: Props) => {
  return (
    <Link
      href={"https://www.facebook.com/profile.php?id=100087809405545"}
      className={cn(
        buttonVariants({ size: "sm", className: "w-full" }),
        className
      )}
      {...props}
    >
      {title}
    </Link>
  );
};

export { WithdrawLink };
