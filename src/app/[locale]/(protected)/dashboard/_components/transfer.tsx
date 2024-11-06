"use client";

import * as React from "react";

import { TransferForm } from "@/app/[locale]/(protected)/dashboard/_components/transfer-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  //   DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Message, TransCard } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLElement> & {
  type:
    | "personalCheckingAccounts"
    | "personalSavingsAccounts"
    | "businessAccounts";
  id: string;
  data: {
    transCard: TransCard;
    message: Message;
    type: { checking: string; savings: string; business: string };
  };
};

const Transfer = ({ type, id, data, className, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="w-full">
            {data.transCard.title}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{data.transCard.title}</DialogTitle>
          </DialogHeader>
          <TransferForm type={type} id={id} setOpen={setOpen} data={data} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="w-full">
          {data.transCard.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{data.transCard.title}</DrawerTitle>
        </DrawerHeader>
        <TransferForm
          className="px-4"
          type={type}
          id={id}
          setOpen={setOpen}
          data={data}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{data.transCard.cancel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Transfer };
