"use client";

import * as React from "react";

import { WithdrawForm } from "@/app/[locale]/(protected)/dashboard/_components/withdraw-form";
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
import type { Message, WithdrawCard } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLElement> & {
  type:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  data: {
    withdrawCard: WithdrawCard;
    message: Message;
    type: { checking: string; savings: string; business: string };
  };
};

const Withdraw = ({ type, id, data, className, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="w-full">
            {data.withdrawCard.title}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{data.withdrawCard.title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <WithdrawForm type={type} id={id} setOpen={setOpen} data={data} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"} className="w-full">
          {data.withdrawCard.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{data.withdrawCard.title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <WithdrawForm
          className="px-4"
          type={type}
          id={id}
          data={data}
          setOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{data.withdrawCard.cancel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Withdraw };
