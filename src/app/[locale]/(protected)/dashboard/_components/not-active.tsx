"use client";

import * as React from "react";

import { EmailForm } from "@/components/shared/new-email-form";
import { Shell } from "@/components/shared/shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { Block } from "@/types/dash";

const NotActive = ({
  email,
  data,
  placeholder,
}: {
  email?: string | null;
  data: Block;
  placeholder: {
    email: string;
    message: string;
    send: string;
    success: string;
    cancel: string;
  };
}) => {
  const handleContactSupportClick = () => {
    window.dispatchEvent(
      new CustomEvent("populateEmailForm", {
        detail: { email: email },
      })
    );
  };

  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  return (
    <Shell className="max-w-lg">
      <Card className={cn("bg-destructive/30")}>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>{data.desc}</CardContent>
        <CardFooter>
          {/* <Button
            className="w-full"
            size={"sm"}
            onClick={handleContactSupportClick}
          >
            {data.action}
          </Button> */}
          {isMobile ? (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button size={"sm"} className="w-full">
                  {data.action}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <EmailForm
                  placeholder={placeholder}
                  className="px-4 pt-6"
                  setOpen={setOpen}
                />
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="outline">{placeholder.cancel}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size={"sm"} className="w-full">
                  {data.action}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <EmailForm placeholder={placeholder} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </Shell>
  );
};

export { NotActive };
