"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { signinCredential } from "@/lib/actions";
import { catchError, cn } from "@/lib/utils";
import {
  authWithCredentialsSchema,
  type AuthWithCredentialsPayload,
} from "@/lib/validations/auth";
import type { Message } from "@/types/auth";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  auth: { send: string; username: string; message: Message };
};

const defaultValues: AuthWithCredentialsPayload = {
  password: "",
  nameOrEmail: "",
};

const SigninForm = ({ auth, className, ...props }: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<AuthWithCredentialsPayload>({
    resolver: zodResolver(authWithCredentialsSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const message = auth.message;
  function onSubmit(data: AuthWithCredentialsPayload) {
    startTransition(async () => {
      try {
        const res = await signinCredential(data);
        if (res == true) form.reset();
        if (res !== true && res) throw new Error(message[res]);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-3 text-left", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="nameOrEmail"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={auth.username} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          isLoading={isPending}
          className="w-full"
          size="sm"
          type="submit"
        >
          {auth.send}
        </Button>
      </form>
    </Form>
  );
};

export { SigninForm };
