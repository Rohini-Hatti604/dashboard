import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, Copy } from "lucide-react";
import { TagTableRow } from "../../../sections/browse-images/mockdata";

interface UseTagsColumnsOptions {
    onTagClick?: (tag: TagTableRow) => void;
}

export function useTagsColumns(options?: UseTagsColumnsOptions): ColumnDef<TagTableRow>[] {
    return [
        {
            accessorKey: "tag",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Tag</span>,
            cell: ({ row }) => (
                <button
                    className="text-sm text-[#FAFAFA] hover:underline hover:text-[#039BE6] focus:outline-none cursor-pointer"
                    onClick={() => options?.onTagClick?.(row.original)}
                    type="button"
                >
                    {row.original.tag}
                </button>
            ),
        },
        {
            accessorKey: "pullUrl",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Pull URL</span>,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <button
                            className="mr-1 p-1 hover:bg-[#363636] rounded cursor-pointer"
                            title="Copy"
                            onClick={() => {
                                navigator.clipboard.writeText(row.original.pullUrl);
                            }}
                        >
                            <Copy size={16} className="text-[#FAFAFA]" />
                        </button>
                        <span className="text-xs text-[#039BE6] underline font-mono cursor-pointer" onClick={() => { navigator.clipboard.writeText(row.original.pullUrl); }}>{row.original.pullUrl}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "compressedSize",
            header: () => <span className="text-xs font-medium text-[#FAFAFA] uppercase">Compressed Size</span>,
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm text-[#FAFAFA]">{row.original.compressedSize}</span>
                    <span className="text-xs text-[#FAFAFA] opacity-50">{row.original.architecture}</span>
                </div>
            ),
        },
        {
            accessorKey: "lastChanged",
            header: () => (
                <span className="flex items-center gap-1 text-xs font-medium text-[#FAFAFA] uppercase">
                    Last Changed <ArrowDown size={16} className="ml-1" />
                </span>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-[#FAFAFA]">{row.original.lastChanged}</span>
            ),
        },
    ];
}

export default useTagsColumns; 