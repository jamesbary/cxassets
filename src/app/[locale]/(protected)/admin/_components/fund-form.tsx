"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { fund } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import {
  accountSchema,
  type AccountPayload,
} from "@/lib/validations/transaction";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  type:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  number: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FundForm = ({
  type,
  id,
  number,
  setOpen,
  className,
  ...props
}: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: AccountPayload = {
    accountId: id,
    amount: "",
    number: number,
    type,
  };

  const form = useForm<AccountPayload>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(data: AccountPayload) {
    startTransition(async () => {
      try {
        await fund(data);
        toast.success("Transfer completed successfully");
        form.reset();
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
                    Personal Checking Account
                  </SelectItem>
                  <SelectItem value="personalSavingsAccounts">
                    Personal Savings Account
                  </SelectItem>
                  <SelectItem value="businessAccounts">
                    Business Account
                  </SelectItem>
                </SelectContent>
              </Select>
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
                <FormLabel>Amount (USD)</FormLabel>
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
          Fund Now
        </Button>
      </form>
    </Form>
  );
};

export { FundForm };
