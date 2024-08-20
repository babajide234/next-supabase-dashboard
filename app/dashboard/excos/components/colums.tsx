"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExcoRecord } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash,ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<ExcoRecord>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: info => info.getValue(),
    },
    {
      accessorKey: "phone",
      header: "phone",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: info => {
        const status = info.getValue();
        return (
            <Badge variant={"default"} className={
                status === 'male' ? "bg-blue-300/80 text-blue-700 hover:text-white": "bg-pink-300/80 text-pink-700 hover:text-white"}>{status}</Badge>
        )
      }
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: info => {
            const type = info.getValue();
            return (
                <Badge
                    variant="default"
                    className={
                        type === 'state' 
                        ? "bg-gray-300 text-gray-700" 
                        : type === 'lga' 
                        ? "bg-pink-300/80 text-pink-700" 
                        : type === 'ward' 
                        ? "bg-pink-300/80 text-pink-700"
                        : ""
                    }
                >
                    {type}
                </Badge>

            )
        }
    },
    {
        accessorKey: "position",
        header: "Position",
        cell: info => info.getValue(),
    },
    {
      accessorKey: "state",
      header: "State",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "lga",
      header: "LGA",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "ward",
      header: "Ward",
      cell: info => info.getValue(),
    },
    {
      id: "actions",
      cell: ({ row }) => {
          const moderator = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                

                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <Trash size={14}/>
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
];
  



