"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPin } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { pinSchema, type PinPayload } from "@/lib/validations/transaction";
import { CreatePin } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  data: CreatePin;
};

const defaultValues: PinPayload = {
  pin: "",
};

const CreateForm = ({ data, className, ...props }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<PinPayload>({
    resolver: zodResolver(pinSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(input: PinPayload) {
    startTransition(async () => {
      try {
        await createPin(input);
        toast.success(data.success.message);
        router.push("/dashboard");
      } catch (err) {
        console.log({ err });
        toast.error(data.error.message);
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
          name="pin"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>{data.name}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  inputMode="numeric"
                  className={cn(error && "focus-visible:ring-destructive")}
                  maxLength={6}
                  placeholder="******"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 6) {
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
          disabled={isPending || !form.formState.isValid}
          isLoading={isPending}
          className="w-full"
          size="sm"
          type="submit"
        >
          {data.proceed}
        </Button>
      </form>
    </Form>
  );
};

export { CreateForm };
