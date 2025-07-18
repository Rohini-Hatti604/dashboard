import { CircleCheck, CircleX } from "lucide-react";
import { ArrowsSort } from "tabler-icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { AdvisoryPackage } from "@/components/sections/browse-images/mockdata";

export default function useAdvisoryPackagesColumn(): ColumnDef<AdvisoryPackage>[] {
    return [
        {
            accessorKey: "originPackage",
            header: () => (
                <div className="flex items-center">
                    <span>ORIGIN PACKAGE</span>
                    <ArrowsSort size={16} className="ml-2 text-gray-500" />
                </div>
            ),
            cell: ({ row }) => {
                const pkg = row.getValue("originPackage") as string;
                return (
                    <div className="flex items-center">
                        <span>{pkg}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: "status",
            header: () => (
                <div className="flex items-center">
                    <span>STATUS</span>
                    <ArrowsSort size={16} className="ml-2 text-gray-500" />
                </div>
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <div className="flex items-center gap-1">
                        { status === "fixed" ? <CircleCheck size={16} className="inline-block mr-1 text-green-400" /> : status === "fix Not Planned" ? <CircleX size={16} className="inline-block mr-1 text-red-400" /> : "" }
                        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </div>
                )

            }
        },
        {
            accessorKey: "fixedVersion",
            header: "FIXED VERSION",
            cell: ({ row }) => {
                const fixedVersion = row.getValue("fixedVersion") as string;
                return <span>{fixedVersion || "N/A"}</span>;
            }
        },
        {
            accessorKey: "lastUpdated",
            header: "LAST UPDATED",
            cell: ({ row }) => {
                const lastUpdated = row.getValue("lastUpdated") as string;
                return <span>{lastUpdated || "N/A"}</span>;
            }
        }
    ]
}