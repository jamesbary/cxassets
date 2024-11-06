"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { DataTableViewOptions } from "@/app/[locale]/(protected)/dashboard/_components/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/app/[locale]/(protected)/dashboard/_components/data-table-faceted-filter";
import { status, type } from "@/config/constants";
import type { Transfer } from "@/types/dash";
import { useTranslation } from "react-i18next";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { t } = useTranslation();
  const transferData = t("meta.transfer", { returnObjects: true }) as Transfer;

  return (
    <div className="flex flex-col xs:flex-row items-center gap-2">
      <Input
        placeholder={transferData.search}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full xs:w-[150px]"
      />
      <div className="flex gap-2 items-center w-full">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title={transferData.status}
            options={status}
            translated={transferData}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title={transferData.type}
            options={type}
            translated={transferData}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {transferData.reset}
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
