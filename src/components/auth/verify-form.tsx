"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
// import { toast } from 'sonner';

import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { appConfig } from "@/config";
// import { tokenize } from '@/lib/actions';
import { catchError, cn } from "@/lib/utils";
import { tokenSchema, type TokenPayload } from "@/lib/validations/auth";

interface VerifyFormProps extends React.HTMLAttributes<HTMLFormElement> {
  token: string | undefined;
}

const VerifyForm = ({ className, token, ...props }: VerifyFormProps) => {
  const router = useRouter();
  const [_isPending, startTransition] = React.useTransition();
  const [hasRun, setHasRun] = React.useState(false);
  const defaultValues: TokenPayload = {
    token: token ?? "",
  };

  const form = useForm<TokenPayload>({
    resolver: zodResolver(tokenSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { watch } = form;
  const paramToken = watch("token");

  const onSubmit = React.useCallback(
    (data: TokenPayload) => {
      if (!data.token || hasRun) return;

      startTransition(async () => {
        try {
          // const res = await tokenize(data);
          // if (res.status === 'success') {
          // 	toast.success(res.message);
          // } else {
          // 	throw new Error(res.message);
          // }
        } catch (err) {
          catchError(err);
        } finally {
          setHasRun(true);
          router.replace(
            `${appConfig.auth.signin.href}?callbackUrl=${appConfig.auth.onboarding.href}`
          );
        }
      });
    },
    [hasRun, router]
  );

  React.useEffect(() => {
    if (!!paramToken && !hasRun) {
      onSubmit({ token: paramToken });
    }
  }, [paramToken, hasRun, onSubmit]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex gap-3", className)}
        {...props}
      >
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </form>
    </Form>
  );
};

export { VerifyForm };
