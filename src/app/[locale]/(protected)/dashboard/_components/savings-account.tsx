"use client";

import * as React from "react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import { createSavingsAccount } from "@/lib/actions/account";
import { catchError, cn } from "@/lib/utils";
import { type Create as CreateType } from "@/types/dash";

const SavingsAccountDrawerDialog = ({
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

type Props = React.HTMLAttributes<HTMLDivElement> & { create: CreateType };

const Create = ({ create, className, ...props }: Props) => {
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        const res = await createSavingsAccount();
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
    <div className={cn(className)} {...props}>
      <Button
        disabled={isPending}
        isLoading={isPending}
        className="w-full"
        size="sm"
        onClick={handleSubmit}
      >
        {create.confirm}
      </Button>
    </div>
  );
};

SavingsAccountDrawerDialog.displayName = "SavingsAccountDrawerDialog";
Create.displayName = "Create";

export { Create, SavingsAccountDrawerDialog };
