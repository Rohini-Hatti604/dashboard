import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, ArrowsSort } from "tabler-icons-react";
import { PackageTableRow } from "../../sections/browse-images/mockdata";

export function useTagPackageColumns(): ColumnDef<PackageTableRow>[] {
    return [
        {
            accessorKey: "name",
            header: () => (
                <span className="flex items-center gap-1 text-xs font-medium text-[#FAFAFA] uppercase">
                    <ArrowsSort size={16} className="mr-1" /> Package
                </span>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.name}</span>
            ),
        },
        {
            accessorKey: "version",
            header: () => (
                <span className="flex items-center gap-1 text-xs font-medium text-[#FAFAFA] uppercase">
                    <ArrowsSort size={16} className="mr-1" /> Version
                </span>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.version}</span>
            ),
        },
        {
            accessorKey: "repository",
            header: () => (
                <span className="flex items-center gap-1 text-xs font-medium text-[#FAFAFA] uppercase">
                    <ArrowsSort size={16} className="mr-1" /> Repository
                </span>
            ),
            cell: ({ row }) => (
                <span className="flex items-center text-sm text-[#FAFAFA] gap-1">
                    {row.original.repository}
                    <ArrowUpRight size={16} className="ml-1" />
                </span>
            ),
        },
        {
            accessorKey: "license",
            header: () => (
                <span className="flex items-center gap-1 text-xs font-medium text-[#FAFAFA] uppercase">
                    <ArrowsSort size={16} className="mr-1" /> License
                </span>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.license}</span>
            ),
        },
    ];
}

export default useTagPackageColumns; 