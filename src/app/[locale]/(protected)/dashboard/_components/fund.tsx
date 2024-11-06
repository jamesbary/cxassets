"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CopyToClipboard } from "@/components/shared/copy-to-clipboard";
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
import { transact } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import {
  transactionSchema,
  type TransactionPayload,
} from "@/lib/validations/transaction";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  account:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  type: "fund" | "transfer";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FundForm = ({
  account,
  id,
  type,
  setOpen,
  className,
  ...props
}: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: TransactionPayload = {
    accountId: id,
    account,
    amount: "",
    status: "pending",
    type,
    description: type === "fund" ? "btc" : "",
  };

  const form = useForm<TransactionPayload>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(data: TransactionPayload) {
    startTransition(async () => {
      try {
        await transact(data);
        toast.success("Action completed successfully");
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
          name="account"
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
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fund">Fund Account</SelectItem>
                  <SelectItem value="transfer">Transfer Fund</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {type === "transfer" ? (
          <FormField
            control={form.control}
            name="number"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                {error ? (
                  <FormLabel>{error.message}</FormLabel>
                ) : (
                  <FormLabel>Account Number</FormLabel>
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
        ) : (
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                {error ? (
                  <FormLabel>{error.message}</FormLabel>
                ) : (
                  <FormLabel>Method</FormLabel>
                )}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="btc">crypto (BTC)</SelectItem>
                    <SelectItem value="eth">crypto (ETH)</SelectItem>
                    <SelectItem disabled value="bank">
                      Bank Deposit
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {field.value === "btc" ? (
                    <div className="rounded-md border border-border p-2.5 flex items-center gap-2.5">
                      BTC: rju4jru04tjefngjw3iend{" "}
                      <CopyToClipboard
                        icon
                        textToCopy="rju4jru04tjefngjw3iend"
                        className="size-5 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="rounded-md border border-border p-2.5 flex items-center gap-2.5">
                      ETH: iruhnfjkshfhhgeikfj{" "}
                      <CopyToClipboard
                        icon
                        textToCopy="iruhnfjkshfhhgeikfj"
                        className="size-5 rounded-lg"
                      />
                    </div>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
        )}
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
          className="w-full capitalize"
          size="sm"
          type="submit"
        >
          {type} Now
        </Button>
      </form>
    </Form>
  );
};

export { FundForm };
