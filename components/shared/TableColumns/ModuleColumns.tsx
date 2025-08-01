"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { storeIsEdit, storeModelName, storeModuleId, storeModuleModal } from "@/redux/slices/applicationSlice";

const EditModuleComponent = ({ module }: { module: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleEditModuleClick = () => {
        dispatch(storeIsEdit(true));
        dispatch(storeModuleId(module?._id || ""));
        dispatch(storeModelName(module?.module_name || ""));
        dispatch(storeModuleModal(true));
    }
    return (
        <DropdownMenuItem onClick={handleEditModuleClick}>Edit module</DropdownMenuItem>
    )
}

export const moduleColumns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "module_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Module Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.module_name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span>{module?.createdAt}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "g_id_count",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Generated IDs Count
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span>{module?.g_id_count}</span>
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const module: any = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(module?._id)}
                        >
                            Copy module ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View module</DropdownMenuItem>
                        <EditModuleComponent module={module} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]