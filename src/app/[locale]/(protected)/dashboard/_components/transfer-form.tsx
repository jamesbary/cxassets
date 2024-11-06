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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transfer } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import {
  accountSchema,
  type AccountPayload,
} from "@/lib/validations/transaction";
import type { Message, TransCard } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  type:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    transCard: TransCard;
    message: Message;
    type: { checking: string; savings: string; business: string };
  };
};

const TransferForm = ({
  type,
  id,
  data,
  setOpen,
  className,
  ...props
}: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: AccountPayload = {
    accountId: id,
    amount: "",
    number: "",
    type,
  };

  const form = useForm<AccountPayload>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(input: AccountPayload) {
    startTransition(async () => {
      try {
        const res = await transfer(input);
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
          name="type"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <Select
                disabled
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="personalCheckingAccounts">
                    {data.type.checking}
                  </SelectItem>
                  <SelectItem value="personalSavingsAccounts">
                    {data.type.savings}
                  </SelectItem>
                  <SelectItem value="businessAccounts">
                    {data.type.business}
                  </SelectItem>
                </SelectContent>
              </Select>
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
                <FormLabel>{data.transCard.number}</FormLabel>
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
          name="amount"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormLabel>{error.message}</FormLabel>
              ) : (
                <FormLabel>{data.transCard.amount}</FormLabel>
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
          {data.transCard.proceed}
        </Button>
      </form>
    </Form>
  );
};

export { TransferForm };
