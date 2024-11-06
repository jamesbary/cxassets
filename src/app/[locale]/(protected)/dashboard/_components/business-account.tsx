"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { createBusinessAccount } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import {
  businessAccountSchema,
  type BusinessAccountPayload,
} from "@/lib/validations/account";
import { type Create as CreateType } from "@/types/dash";

const BusinessAccountDrawerDialog = ({
  create,
}: {
  create: CreateType & { action: string };
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="w-full">
            {create.action}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{create.title}</DialogTitle>
            <DialogDescription>{create.desc}</DialogDescription>
          </DialogHeader>
          <Create create={create} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"} className="w-full">
          {create.action}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{create.title}</DrawerTitle>
          <DrawerDescription>{create.desc}</DrawerDescription>
        </DrawerHeader>
        <Create create={create} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{create.cancel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

BusinessAccountDrawerDialog.displayName = "BusinessAccountDrawerDialog";

type Props = React.HTMLAttributes<HTMLFormElement> & { create: CreateType };

const defaultValues: BusinessAccountPayload = {
  businessName: "",
  businessType: "",
};

const Create = ({ create, className, ...props }: Props) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<BusinessAccountPayload>({
    resolver: zodResolver(businessAccountSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(data: BusinessAccountPayload) {
    startTransition(async () => {
      try {
        const res = await createBusinessAccount(data);
        if (res === true) {
          toast.success(create.success);
        }
        if (res !== true && res === "exists") throw new Error(create.exists);
        if (res !== true && res !== "exists") throw new Error(create.error);
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
          name="businessName"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={create.placeholder?.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessType"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              {error ? <FormMessage>{error.message}</FormMessage> : null}
              <FormControl>
                <Input placeholder={create.placeholder?.type} {...field} />
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
          {create.confirm}
        </Button>
      </form>
    </Form>
  );
};
Create.displayName = "Create";

export { BusinessAccountDrawerDialog, Create };
