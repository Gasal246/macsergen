"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const moduleShowColumns: ColumnDef<any>[] = [
    {
        accessorKey: "model_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Model Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.model_number}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "suffix",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Suffix SN
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.suffix}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.description}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "chipset",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Chipset
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center uppercase">{module?.chipset}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "ap_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center capitalize">{module?.ap_type}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "mac_allocated",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    MAC Allocated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center capitalize">{module?.mac_allocated}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "serial_allocated",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SerialNo Allocated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center capitalize">{module?.serial_allocated}</span>
                </div>
            )
        },
    }
]