"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { storeApType, storeChipset, storeDeleteModuleModal, storeDescription, storeIsEdit, storeModelNumber, storeModuleId, storeModuleModal, storeQty, storeSuffix } from "@/redux/slices/applicationSlice";
import { useRouter } from "next/navigation";

const EditModuleComponent = ({ module }: { module: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleEditModuleClick = () => {
        dispatch(storeIsEdit(true)); // edit mode "true"
        dispatch(storeModuleId(module?._id || ""));
        dispatch(storeModelNumber(module?.model_number || ""));
        dispatch(storeSuffix(module?.suffix || ""));
        dispatch(storeChipset(module?.chipset || ""));
        dispatch(storeApType(module?.ap_type || ""));
        dispatch(storeDescription(module?.description || ""));
        dispatch(storeQty(module?.qty || 0));
        dispatch(storeModuleModal(true)); // add or edit dialog
    }
    return (
        <DropdownMenuItem onClick={handleEditModuleClick}>Edit module</DropdownMenuItem>
    )
}

const DeleteModuleComponent = ({ module }: { module: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handlePressDeleteModule = () => {
        dispatch(storeDeleteModuleModal(true))
        dispatch(storeModuleId(module?._id || ""))
    }
    return (
        <DropdownMenuItem onClick={handlePressDeleteModule}>Delete module</DropdownMenuItem>
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
        accessorKey: "telx_model_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TelX Model Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.telx_model_number}</span>
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
        accessorKey: "assigned_count",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Assigned
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center capitalize">{module?.assigned_count}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "unallocated_count",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Unallocated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center capitalize">{module?.unallocated_count}</span>
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const module: any = row.original
            const router = useRouter()
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
                        <DropdownMenuItem onClick={() => router.push(`/module/${module?._id}`)}>View module</DropdownMenuItem>
                        <EditModuleComponent module={module} />
                        <DeleteModuleComponent module={module} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]