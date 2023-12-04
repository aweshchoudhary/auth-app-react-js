"use client";
import { UserInterface } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<UserInterface>[] = [
  {
    accessorKey: "number",
    header: "Mobile Number",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "superuser",
    header: "Super User",
  },
];
