"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/app/[locale]/(protected)/dashboard/_components/data-table-column-header";
import { Icons } from "@/components/shared/icons";
import { status, type } from "@/config/constants";
import type { TransactionWithName } from "@/types";
import { Transfer } from "@/types/dash";

type TransactionTable = Pick<
  TransactionWithName,
  "description" | "amount" | "status" | "type" | "date" | "name"
>;

interface TranslationWrapperProps<TData> {
  column: Column<TData, unknown>;
  titleKey: string;
}

interface TranslationCellWrapperProps {
  row: Row<TransactionTable>;
  cellKey: "type" | "status";
}

const TranslationWrapper = <TData,>({
  column,
  titleKey,
}: TranslationWrapperProps<TData>) => {
  const { t } = useTranslation();
  const translatedTitle = t(titleKey);
  return <DataTableColumnHeader column={column} title={translatedTitle} />;
};

const TranslationCellWrapper: React.FC<TranslationCellWrapperProps> = ({
  row,
  cellKey,
}) => {
  const { t } = useTranslation();

  const transferData = t("meta.transfer", { returnObjects: true }) as Transfer;
  if (cellKey === "status") {
    const stat = status.find((stat) => stat.value === row.getValue(cellKey));
    if (!stat) return null;

    const Icon = Icons[stat.icon];
    const statvalue = stat.value as "pending" | "rejected" | "success";
    return (
      <div className="flex items-center">
        <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
        {/* <span>{t(stat.label)}</span> */}
        <span>{transferData[statvalue]}</span>
      </div>
    );
  }

  if (cellKey === "type") {
    const ty = type.find((ty) => ty.value === row.getValue(cellKey));
    if (!ty) return null;

    const Icon = Icons[ty.icon];
    const tyvalue = ty.value as "transfer" | "fund";
    return (
      <div className="flex items-center">
        <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
        {/* <span>{t(ty.label)}</span> */}
        <span>{transferData[tyvalue]}</span>
      </div>
    );
  }

  return null;
};

export const columns: ColumnDef<TransactionTable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TranslationWrapper<TransactionTable>
        column={column}
        titleKey="meta.transfer.name"
      />
    ),
    cell: ({ row }) => (
      <span className="truncate font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TranslationWrapper<TransactionTable>
        column={column}
        titleKey="meta.transfer.amount"
      />
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
      <TranslationWrapper<TransactionTable>
        column={column}
        titleKey="meta.transfer.status"
      />
    ),
    cell: ({ row }) => <TranslationCellWrapper row={row} cellKey="status" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <TranslationWrapper<TransactionTable>
        column={column}
        titleKey="meta.transfer.type"
      />
    ),
    cell: ({ row }) => <TranslationCellWrapper row={row} cellKey="type" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <TranslationWrapper<TransactionTable>
        column={column}
        titleKey="meta.transfer.date"
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {format(new Date(row.getValue("date")), "MMM do, y")}
      </span>
    ),
  },
];
