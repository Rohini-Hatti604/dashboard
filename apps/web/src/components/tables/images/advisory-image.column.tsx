import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CircleCheck, CircleX } from "lucide-react";
import { ICVE } from "../../../../../../packages/shared/src/entities/images/cve";

dayjs.extend(relativeTime);

export default function useImageAdvisoryColumn({
  onAdvisoryClick,
}: {
  onAdvisoryClick: (advisory: ICVE) => void;
}): ColumnDef<ICVE>[] {
  return [
    {
      accessorKey: "cveId",
      header: "CVE",
      cell: ({ row }) => (
        <button
          className="text-sm focus:outline-none cursor-pointer"
          onClick={() => onAdvisoryClick(row.original)}
          type="button"
        >
          {row.getValue("cveId")}
        </button>
      ),
    },
    {
      accessorKey: "packages",
      header: "PACKAGE",
      cell: ({ row }) => {
        const pkgList = row.original.packages?.map((pkg) => pkg.name).join(", ");
        return <span>{pkgList || "—"}</span>;
      },
    },
    {
      accessorKey: "severity",
      header: "SEVERITY",
      cell: ({ row }) => {
        const severity = (row.getValue("severity") as string)?.toLowerCase();
        const label = severity.charAt(0).toUpperCase() + severity.slice(1);
        return (
          <div className={`priority-tag priority-${severity}`}>
            <div className="priority-dot"></div>
            <span>{label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-1">
            {status === "fixed" ? (
              <CircleCheck size={16} className="text-green-400" />
            ) : status === "wont_fix" ? (
              <CircleX size={16} className="text-red-400" />
            ) : null}
            <span>{status.replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: "PUBLISHED",
      cell: ({ row }) => {
        const date = dayjs(row.getValue("publishedAt")).format("MMMM D, YYYY");
        return <span>{date}</span>;
      },
    },
    {
      accessorKey: "detectedAt",
      header: "FIRST DETECTION",
      cell: ({ row }) => {
        const date = dayjs(row.getValue("detectedAt")).format("MMMM D, YYYY");
        return <span>{date}</span>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "LAST UPDATED",
      cell: ({ row }) => {
        const date = dayjs(row.getValue("updatedAt")).format("MMMM D, YYYY");
        return <span>{date}</span>;
      },
    },
  ];
}
