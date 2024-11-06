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
import { addUser } from "@/lib/actions";
import { catchError, cn } from "@/lib/utils";
import { userSchema, type UserPayload } from "@/lib/validations/auth";
import type { Message, Placeholder } from "@/types/auth";
import { toast } from "sonner";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  auth: Placeholder & { send: string; message: Message };
};

const defaultValues: UserPayload = {
  name: "",
  password: "",
  username: "",
  role: "user",
  country: "",
  email: "",
};

const SignupForm = ({ auth, className, ...props }: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<UserPayload>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const message = auth.message;
  function onSubmit(data: UserPayload) {
    startTransition(async () => {
      try {
        const res = await addUser(data);
        if (res == true) {
          form.reset();
          toast.success("created an account");
        }
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
          name="username"
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
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={auth.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={auth.country} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={auth.email} {...field} />
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
          disabled={isPending}
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

export { SignupForm };
