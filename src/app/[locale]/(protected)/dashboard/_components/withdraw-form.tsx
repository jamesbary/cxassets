"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  bankSchema,
  pinSchema,
  type BankPayload,
} from "@/lib/validations/transaction";
import type { Message, WithdrawCard } from "@/types/dash";

type WithdrawFormData = Omit<BankPayload, "pin">;

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
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const [showPinDialog, setShowPinDialog] = React.useState(false);
  const [formData, setFormData] = React.useState<WithdrawFormData | null>(null);
  const [pin, setPin] = React.useState("");

  const defaultValues: WithdrawFormData = {
    accountId: id,
    type,
    amount: "",
    number: "",
    bank: "",
    name: "",
  };

  const form = useForm<WithdrawFormData>({
    resolver: zodResolver(bankSchema.omit({ pin: true })),
    defaultValues,
    mode: "onSubmit",
  });

  const pinForm = useForm({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onChange",
  });

  function handleInitialSubmit(data: WithdrawFormData) {
    setFormData(data);
    setShowPinDialog(true);
  }

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    startTransition(async () => {
      try {
        const fullData = {
          ...formData,
          pin,
        };

        const res = await withdraw(fullData);
        if (res === true) {
          toast.success(data.message.success);
          form.reset();
          setPin("");
          setShowPinDialog(false);
        } else {
          setPin("");
          if (res === "no_pin") {
            toast.info(data.message["no_pin"]);
            return router.push("/settings/create-pin");
          }
          throw new Error(data.message[res]);
        }
        setOpen(false);
      } catch (err) {
        catchError(err);
      }
    });
  }

  // function onSubmit(input: BankPayload) {
  //   startTransition(async () => {
  //     try {
  //       const res = await withdraw(input);
  //       if (res === true) {
  //         toast.success(data.message.success);
  //         form.reset();
  //       } else {
  //         throw new Error(data.message[res]);
  //       }
  //       setOpen(false);
  //     } catch (err) {
  //       catchError(err);
  //     }
  //   });
  // }

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInitialSubmit)}
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
                  <Input className="h-9" {...field} />
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
            {data.withdrawCard.pin.proceed}
          </Button>
        </form>
      </Form>
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data.withdrawCard.pin.title}</DialogTitle>
          </DialogHeader>
          <Form {...pinForm}>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <FormField
                control={pinForm.control}
                name="pin"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{data.withdrawCard.pin.label}</FormLabel>
                    <FormControl>
                      {/* <Input
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="******"
                        value={pin}
                        onChange={(e) => {
                          // Ensure only numeric input
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value === "" ? 0 : Number(value));

                          setPin(value);
                          field.onChange(e);
                        }}
                        className="h-9"
                      /> */}
                      <Input
                        type="password"
                        inputMode="numeric"
                        className={cn(
                          error && "focus-visible:ring-destructive"
                        )}
                        maxLength={6}
                        placeholder="******"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 6) {
                            setPin(value);
                            field.onChange(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter, and numbers
                          const allowedKeys = [
                            "Backspace",
                            "Delete",
                            "Tab",
                            "Escape",
                            "Enter",
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                          ];

                          // Allow if key is in allowedKeys
                          if (allowedKeys.includes(e.key)) {
                            return;
                          }

                          // Allow numbers using numeric keypad
                          if (
                            e.key.startsWith("Numpad") &&
                            !isNaN(parseInt(e.key.slice(6)))
                          ) {
                            return;
                          }

                          // Allow regular number keys
                          if (/^\d$/.test(e.key)) {
                            return;
                          }

                          // Prevent all other keys
                          e.preventDefault();
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending || !pinForm.formState.isValid}
                isLoading={isPending}
                className="w-full"
                size="sm"
                type="submit"
              >
                {data.withdrawCard.proceed}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export { WithdrawForm };
