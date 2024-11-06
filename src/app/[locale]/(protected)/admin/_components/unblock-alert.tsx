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
import { catchError } from "@/lib/utils";
import { useTransition } from "react";

export function UnblockUser({ name, id }: { name: string | null; id: string }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      try {
        await giveAccess(id, "active");
        toast.success("User unblocked successfully");
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Unblock</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will make the platform usable for {name ?? "the user"}.
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
