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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/lib/actions/message";
import { catchError, cn } from "@/lib/utils";
import { emailSchema, type EmailPayload } from "@/lib/validations/message";

interface EmailProps extends React.HTMLAttributes<HTMLFormElement> {
  email?: string;
  placeholder: {
    email: string;
    message: string;
    send: string;
    success: string;
    cancel: string;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PopulateEmailFormEventDetail {
  email: string;
}

const EmailForm = ({
  placeholder,
  email,
  setOpen,
  className,
  ...props
}: EmailProps) => {
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: EmailPayload = {
    email: email ?? "",
    message: "",
  };

  const form = useForm<EmailPayload>({
    resolver: zodResolver(emailSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(data: EmailPayload) {
    startTransition(async () => {
      try {
        const res = await sendMessage({
          ...data,
        });

        if (res) {
          throw new Error(res);
        } else {
          form.reset();
          toast.success(placeholder.success);
          setOpen(false);
        }
      } catch (err) {
        catchError(err);
      }
    });
  }
  React.useEffect(() => {
    const handlePopulateEmailForm = (e: CustomEvent) => {
      // Assert the correct type for the event detail
      const detail = e.detail as PopulateEmailFormEventDetail;

      form.setValue("email", detail.email);

      const messageTextarea = document.querySelector(
        'textarea[name="message"]'
      );
      if (messageTextarea instanceof HTMLTextAreaElement) {
        messageTextarea.focus();
      }
    };

    window.addEventListener(
      "populateEmailForm",
      handlePopulateEmailForm as EventListener
    );

    return () => {
      window.removeEventListener(
        "populateEmailForm",
        handlePopulateEmailForm as EventListener
      );
    };
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-1.5 text-left w-full", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input
                  className="h-8"
                  type="email"
                  {...field}
                  placeholder={placeholder.email}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? (
                <FormMessage>{error.message}</FormMessage>
              ) : // <FormLabel>How can we help?</FormLabel>
              null}
              <FormControl>
                <Textarea
                  className="resize-none min-h-[70px]"
                  {...field}
                  placeholder={placeholder.message}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          isLoading={isPending}
          size="sm"
          type="submit"
          className="w-full h-8"
        >
          {placeholder.send}
        </Button>
      </form>
    </Form>
  );
};

export { EmailForm };
