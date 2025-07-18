import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowsSort } from "tabler-icons-react";

export interface ClosedTicket {
    id: string;
    lastUpdate: string; // e.g., "2h ago"
    lastUpdateDate: string; // e.g., "28 Nov 2024 - 05:34:49 IST"
    subject: string;
    commentsCount: number;
    from: string;
    closedBy: string;
}

export function useClosedTicketsColumns(): ColumnDef<ClosedTicket>[] {
    return [
        {
            id: "ticket",
            header: ({ table }) => (
                <div className="flex items-center gap-3 text-[14px] font-medium text-[#FAFAFA]">
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                    Ticket
                    <ArrowsSort size={16} className="text-[#FAFAFA]" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                    <span className="text-[14px] text-[#FAFAFA]">{row.original.id}</span>
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "lastUpdate",
            header: () => (
                <div className="flex items-center gap-3 text-[14px] font-medium text-[#FAFAFA]">
                    Last Update
                    <ArrowsSort size={16} className="text-[#FAFAFA]" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#FAFAFA]">{row.original.lastUpdate}</span>
                    <span className="text-[12px] font-light text-[#FAFAFA]/50">{row.original.lastUpdateDate}</span>
                </div>
            ),
        },
        {
            id: "subject",
            header: () => (
                <div className="flex items-center gap-3 text-[14px] font-medium text-[#FAFAFA]">
                    Subject
                    <ArrowsSort size={16} className="text-[#FAFAFA]" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#FAFAFA]">{row.original.subject}</span>
                    <span className="text-[12px] font-light text-[#FAFAFA]/50">[{row.original.commentsCount} comment{row.original.commentsCount !== 1 ? 's' : ''}]</span>
                </div>
            ),
        },
        {
            id: "from",
            header: () => (
                <div className="flex items-center gap-3 text-[14px] font-medium text-[#FAFAFA]">
                    From
                    <ArrowsSort size={16} className="text-[#FAFAFA]" />
                </div>
            ),
            cell: ({ row }) => (
                <span className="text-[14px] text-[#FAFAFA]">{row.original.from}</span>
            ),
        },
        {
            id: "closedBy",
            header: () => (
                <div className="flex items-center gap-3 text-[14px] font-medium text-[#FAFAFA]">
                    Closed By
                    <ArrowsSort size={16} className="text-[#FAFAFA]" />
                </div>
            ),
            cell: ({ row }) => (
                <span className="text-[14px] text-[#FAFAFA]">{row.original.closedBy}</span>
            ),
        },
    ];
}

export default useClosedTicketsColumns;
