"use client";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { giveAccess } from "@/lib/actions/user";
import { catchError, cn } from "@/lib/utils";
import { useTransition } from "react";

export function BlockUser({ name, id }: { name: string | null; id: string }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      try {
        await giveAccess(id, "closed");
        toast.success("User blocked successfully");
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} className={cn("bg-red-400")}>
          Block
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will make the platform unusable for {name ?? "the user"}{" "}
            and will require your attention later to unblock.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-between sm:flex-row sm:justify-between">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="w-full"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
