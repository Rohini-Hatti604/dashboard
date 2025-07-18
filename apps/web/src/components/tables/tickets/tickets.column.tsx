import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { ArrowsSort, Filter, Flag, Trash, UserPlus } from "tabler-icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Define the ticket data structure
export interface Ticket {
  id: string;
  lastUpdate: string;
  subject: string;
  from: string;
  priority: "low" | "medium" | "high" | "critical";
  assignedTo: string;
}

export function useTicketsColumns(): ColumnDef<Ticket>[] {
  return [
    {
      id: "ticket",
      header: ({ table }) => (
        <div className="font-medium flex items-center gap-3">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <span>Ticket</span>
          <ArrowsSort size={15} className="text-muted-foreground" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium flex items-center gap-3">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <span>#{row.original.id}</span>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "lastUpdate",
      header: () => (
        <div className="font-medium flex items-center gap-3">
          <span>Last Update</span>
          <ArrowsSort size={15} className="text-muted-foreground" />
        </div>
      ),
      cell: ({ row }) => {
        const lastUpdate = dayjs(row.getValue("lastUpdate"));
        return (
          <div className="flex flex-col">
            <span className="text-sm">{lastUpdate.fromNow()}</span>
            <span className="text-xs text-muted-foreground">{lastUpdate.format("DD MMM YYYY • HH:mm:ss")} IST</span>
          </div>
        );
      },
    },
    {
      accessorKey: "subject",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Subject</span>
          <Filter size={15} className="text-muted-foreground" />
        </div>
      ),
    },
    {
      accessorKey: "from",
      header: () => (
        <div className="font-medium flex items-center gap-3">
          <span>From</span>
          <Filter size={15} className="text-muted-foreground" />
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: () => (
        <div className="font-medium flex items-center gap-3">
          <span>Priority</span>
          <Filter size={15} className="text-muted-foreground" />
        </div>
      ),
      cell: ({ row }) => {
        const priority = (row.getValue("priority") as string)?.toLowerCase();
        const label = priority.charAt(0).toUpperCase() + priority.slice(1);
        return (
          <div className={`priority-tag priority-${priority}`}>
            <div className="priority-dot"></div>
            <span>{label}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "assignedTo",
      header: () => (
        <div className="font-medium flex items-center gap-3">
          <span>Assigned To</span>
          <Filter size={15} className="text-muted-foreground" />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => {
        return (
          <div className="flex items-center space-x-2">
            {/* Placeholder for 4 action icons */}
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Action 1</span>
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Action 2</span>
              <Flag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Action 3</span>
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Action 4</span>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}

export default useTicketsColumns;