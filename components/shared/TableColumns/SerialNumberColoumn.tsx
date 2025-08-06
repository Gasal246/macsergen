"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export const serialNumberColumns: ColumnDef<any>[] = [
    {
        accessorKey: "serial_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Serial Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-center">{module?.serial_number}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "used",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Allocation
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const module: any = row.original
            const router = useRouter();
            const handleAllocation = async () => {
                try {
                    const res = await axios.post(`/api/module/useids`, { type: "serial", id: module?._id, used: !module?.used });
                    if (res.status === 200) {
                        row.original.used = !module?.used;
                        toast.success("Serial Number Updated");
                        router.refresh();
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Failed to update Serial Number");
                }
            }
            return (
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold text-center flex items-center gap-2`}>
                    <Switch
                      checked={module?.used}
                      onCheckedChange={handleAllocation}
                    />
                    <span className={`text-xs font-semibold text-center ${module?.used ? "text-green-500" : "text-neutral-800"}`}>{module?.used ? "Allocated" : "Unallocated"}</span>
                    </span>
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
                            onClick={() => navigator.clipboard.writeText(module?.serial_number)}
                        >
                            Copy Serial Number
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]