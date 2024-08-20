"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ModeratorRecord } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash,ArrowUpDown } from "lucide-react";
import EditModerator from "./edit/EditModerator";
import { Badge } from "@/components/ui/badge";
import DeleteModerator from "./edit/DeleteModerator";


export const columns: ColumnDef<ModeratorRecord>[] = [
    {
      accessorKey: "moderators.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: info => info.getValue(),
    },
    {
      accessorKey: "moderators.state",
      header: "State",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "moderators.created_at",
      header: "Created On",
      cell: info => {
        const value = info.getValue() as string; 
        return new Date(value).toDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: info => {
        const status = info.getValue() as string;
        return (
            <Badge variant={ status === 'active' ? "default": "default"} className={status === 'active' ? "bg-green-300/80 text-green-700": "bg-red-300/80 text-red-700"}>{status}</Badge>
        )
      }
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
                
                {/* <EditModerator isAdmin={true}/> */}
                <EditModerator id={moderator.id} status={moderator.status} isAdmin={true} />

                <DropdownMenuSeparator />
                <DeleteModerator user_id={moderator.id}/>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
];
  



