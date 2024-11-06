"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, type ElementRef } from "react";

import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export function Modal({ children, className, ...props }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <section
      className={cn(
        "fixed inset-0 bg-background/80 grid place-items-center",
        className
      )}
      {...props}
    >
      <dialog ref={dialogRef} className="relative max-w-lg" onClose={onDismiss}>
        {children}
        <div className="absolute top-4 right-4">
          <Button
            variant={"secondary"}
            size={"icon"}
            className="h-6 w-6"
            onClick={onDismiss}
          >
            <Icons.close aria-label="close modal" className="h-4 w-4" />
          </Button>
        </div>
      </dialog>
    </section>
  );
}
