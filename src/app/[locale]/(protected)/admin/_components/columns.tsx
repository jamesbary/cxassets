"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/app/[locale]/(protected)/admin/_components/data-table-column-header";
import { DataTableRowActions } from "@/app/[locale]/(protected)/admin/_components/data-table-row-actions";
import { Icons } from "@/components/shared/icons";
import { status, type } from "@/config/constants";
import type { TransactionWithName } from "@/types";

type TransactionTable = Pick<
  TransactionWithName,
  "description" | "amount" | "status" | "type" | "date" | "name"
>;

export const columns: ColumnDef<TransactionTable>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span className="truncate font-medium">{row.getValue("name")}</span>
    ),
  },
  // {
  //   accessorKey: "description",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Description" />
  //   ),
  //   cell: ({ row }) => (
  //     <span className="truncate font-medium">
  //       {row.getValue("description")}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        ${Number(row.getValue("amount")).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const stat = status.find((stat) => stat.value === row.getValue("status"));

      if (!stat) {
        return null;
      }

      const Icon = Icons[stat.icon];
      return (
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{stat.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const ty = type.find((ty) => ty.value === row.getValue("type"));

      if (!ty) {
        return null;
      }

      const Icon = Icons[ty.icon];

      return (
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{ty.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {format(new Date(row.getValue("date")), "MMM do, y")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
