import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronDown } from "lucide-react";
import { ArrowsSort } from "tabler-icons-react";
import { VulnerabilityTableRow } from "../../sections/browse-images/mockdata";

dayjs.extend(relativeTime);

export function useTagVulnerabilitiesColumns(): ColumnDef<VulnerabilityTableRow>[] {
    return [
        {
            accessorKey: "cveId",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">CVE ID</span>
                    <ArrowsSort size={15} className="text-muted-foreground" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        aria-label={row.getIsExpanded ? (row.getIsExpanded() ? 'Collapse row' : 'Expand row') : undefined}
                        onClick={() => row.toggleExpanded && row.toggleExpanded()}
                        className="flex items-center justify-center w-6 h-6 rounded hover:bg-muted/30"
                        style={{ outline: 'none', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        <ChevronDown
                            size={16}
                            className={`transition-transform text-muted-foreground ${row.getIsExpanded && row.getIsExpanded() ? 'rotate-180' : ''}`}
                        />
                    </button>
                    <span>{row.getValue("cveId")}</span>
                </div>
            )
        },
        {
            accessorKey: "severity",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase">Severity</span>
                    <ArrowsSort size={15} className="text-muted-foreground" />
                </div>
            ),
            cell: ({ row }) => {
                const severity = (row.getValue("severity") as string)?.toLowerCase();
                const label = severity.charAt(0).toUpperCase() + severity.slice(1);
                return (
                    <div className={`priority-tag priority-${severity}`}>
                        <div className="priority-dot"></div>
                        <span>{label}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "package",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase">Package</span>
                    <ArrowsSort size={15} className="text-muted-foreground" />
                </div>
            ),
            cell: ({ row }) => (
                <span>{row.getValue("package")}</span>
            )
        },
        {
            accessorKey: "version",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase">Version</span>
                    <ArrowsSort size={15} className="text-muted-foreground" />
                </div>
            ),
            cell: ({ row }) => (
                <span>{row.getValue("version")}</span>
            )
        },
        {
            accessorKey: "lastDetectedDate",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase">Last Detected</span>
                    <ArrowsSort size={15} className="text-muted-foreground" />
                </div>
            ),
            cell: ({ row }) => {
                const lastDetected = dayjs(row.original.lastDetectedDate);
                return (
                    <div className="flex flex-col">
                        <span className="text-sm">{lastDetected.fromNow()}</span>
                        <span className="text-xs text-muted-foreground">
                            {lastDetected.format("DD MMM YYYY").toUpperCase()} . {lastDetected.format("HH:mm:ss")}
                        </span>
                    </div>
                );
            }
        }
    ]
}

export default useTagVulnerabilitiesColumns; 