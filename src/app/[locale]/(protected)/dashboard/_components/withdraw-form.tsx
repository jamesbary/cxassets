"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { withdraw } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import { bankSchema, type BankPayload } from "@/lib/validations/transaction";
import type { Message, WithdrawCard } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  type:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    withdrawCard: WithdrawCard;
    message: Message;
    type: { checking: string; savings: string; business: string };
  };
};

const WithdrawForm = ({
  type,
  id,
  data,
  setOpen,
  className,
  ...props
}: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: BankPayload = {
    accountId: id,
    type,
    amount: "",
    number: "",
    bank: "",
    name: "",
  };

  const form = useForm<BankPayload>({
    resolver: zodResolver(bankSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(input: BankPayload) {
    startTransition(async () => {
      try {
        const res = await withdraw(input);
        if (res === true) {
          toast.success(data.message.success);
          form.reset();
        } else {
          throw new Error(data.message[res]);
        }
        setOpen(false);
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
          name="bank"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormLabel>{error.message}</FormLabel>
              ) : (
                <FormLabel>{data.withdrawCard.bank}</FormLabel>
              )}
              <FormControl>
                <Input
                  //   placeholder={"293847636274"}
                  className="h-9"
                  {...field}
                />
              </FormControl>
              <FormDescription>{}</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormLabel>{error.message}</FormLabel>
              ) : (
                <FormLabel>{data.withdrawCard.number}</FormLabel>
              )}
              <FormControl>
                <Input
                  placeholder={"293847636274"}
                  className="h-9"
                  {...field}
                />
              </FormControl>
              <FormDescription>{}</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormLabel>{error.message}</FormLabel>
              ) : (
                <FormLabel>{data.withdrawCard.name}</FormLabel>
              )}
              <FormControl>
                <Input className="h-9" {...field} />
              </FormControl>
              <FormDescription>{}</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormLabel>{error.message}</FormLabel>
              ) : (
                <FormLabel>{data.withdrawCard.amount}</FormLabel>
              )}
              <FormControl>
                <Input placeholder={"1000"} className="h-9" {...field} />
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
          {data.withdrawCard.proceed}
        </Button>
      </form>
    </Form>
  );
};

export { WithdrawForm };
