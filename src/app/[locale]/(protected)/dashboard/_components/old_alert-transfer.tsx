"use client";

import * as React from "react";

import { FundForm } from "@/app/[locale]/(protected)/dashboard/_components/fund";
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

type Props = React.HTMLAttributes<HTMLElement> & {
  account:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  // type: "fund" | "transfer";
};

const AlertTransfer = ({ account, id, className, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="w-full">
            Transfer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fund before Transfer</DialogTitle>
            <DialogDescription>
              You do not have enough fund to transfer. Fund your account first.
            </DialogDescription>
          </DialogHeader>
          <FundForm account={account} type="fund" id={id} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="w-full">
          Transfer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Fund before Transfer</DrawerTitle>
          <DrawerDescription>
            You do not have enough fund to transfer. Fund your account first.
          </DrawerDescription>
        </DrawerHeader>
        <FundForm
          className="px-4"
          account={account}
          type="fund"
          id={id}
          setOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { AlertTransfer };
