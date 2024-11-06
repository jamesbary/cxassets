"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusSet } from "@/config/constants";
import { type Transaction } from "@/db/schema";
// import { resolveDepositWithdrawalAction } from '@/lib/actions/user';
import { catchError } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: Transaction) {
    startTransition(async () => {
      try {
        // await resolveDepositWithdrawalAction({
        // 	...data,
        // });
        setOpen(false);
        toast.success("Transaction resolved successfully");
      } catch (err) {
        setOpen(false);
        catchError(err);
      }
    });
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted ml-auto"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          disabled={statusSet.has((row.original as Transaction).status)}
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(row.original as Transaction);
          }}
        >
          {isPending ? (
            <Icons.loader className="h-4 w-4 mr-2 animate-spin" />
          ) : null}
          Confirm
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
