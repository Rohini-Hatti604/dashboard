import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownToLine } from "lucide-react";
import { ArrowUpRight } from "tabler-icons-react";
import { SBOMTableRow } from "../../sections/browse-images/mockdata";

export function useSbomColumns(): ColumnDef<SBOMTableRow>[] {
    return [
        {
            accessorKey: "package",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Package</span>,
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.package}</span>
            ),
        },
        {
            accessorKey: "version",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Version</span>,
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.version}</span>
            ),
        },
        {
            accessorKey: "repository",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Repository</span>,
            cell: ({ row }) => (
                <span className="flex items-center text-sm underline cursor-pointer">
                    {row.original.repository}
                    <ArrowUpRight size={16} className="ml-1" />
                </span>
            ),
        },
        {
            accessorKey: "license",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">License</span>,
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.license}</span>
            ),
        },
        {
            accessorKey: "action",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Action</span>,
            cell: () => (
                <button className="p-1 hover:bg-[#363636] rounded cursor-pointer" title="Download">
                    <ArrowDownToLine size={16} className="text-[#FAFAFA]" />
                </button>
            ),
        },
    ];
}

export default useSbomColumns; 