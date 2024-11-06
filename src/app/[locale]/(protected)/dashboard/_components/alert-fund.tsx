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
};

const AlertFund = ({ account, id, className, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="w-full">
            Fund
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fund Account</DialogTitle>
            <DialogDescription>
              Review details and fund your account. Please remember to copy the
              associated account and use the crypto wallet of your choice to
              complete the transaction
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
        <Button size={"sm"} className="w-full">
          Fund
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Fund Account</DrawerTitle>
          <DrawerDescription>
            Review details and fund your account. Please remember to copy the
            associated account and use the crypto wallet of your choice to
            complete the transaction
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

export { AlertFund };
