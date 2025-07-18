"use client";

import useImageAdvisoryColumn from "@/components/tables/images/advisory-image.column";
import { DataTable } from "@/components/tables/table-component";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArrowsSort } from "tabler-icons-react";
import { AdvisoryTableRow } from "./mockdata";
import AdvisoryTabSidesheet from "./advisory-tab-sidesheet";
import { ICVE } from "../../../../../../packages/shared/src/entities/images/cve";

export default function AdvisoryTabContent({ advisoryData }: { advisoryData: ICVE[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [severity, setSeverity] = useState("all");
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [selectedAdvisory, setSelectedAdvisory] = useState<ICVE | null>(null);

  const columns = useImageAdvisoryColumn({
    onAdvisoryClick: (advisory) => {
      setSelectedAdvisory(advisory);
      setSideSheetOpen(true);
    },
  });

  const filteredData = useMemo(() => {
    return advisoryData.filter((row) => {
      const matchSeverity = severity === "all" || row.severity.toLowerCase() === severity;
      const matchStatus = status === "all" || row.status.toLowerCase() === status;
      const matchSearch =
        search.trim() === "" ||
        row.cveId.toLowerCase().includes(search.toLowerCase()) ||
        row.packages?.some((pkg) => pkg.name.toLowerCase().includes(search.toLowerCase()));
      return matchSeverity && matchStatus && matchSearch;
    });
  }, [advisoryData, search, severity, status]);

  const severityOptions = useMemo(() => {
    const counts: Record<string, number> = { all: advisoryData.length };
    advisoryData.forEach((a) => {
      const sev = a.severity.toLowerCase();
      counts[sev] = (counts[sev] || 0) + 1;
    });
    return [
      { value: "all", label: `All (${counts["all"] || 0})` },
      { value: "low", label: `Low (${counts["low"] || 0})` },
      { value: "medium", label: `Medium (${counts["medium"] || 0})` },
      { value: "high", label: `High (${counts["high"] || 0})` },
      { value: "critical", label: `Critical (${counts["critical"] || 0})` },
    ];
  }, [advisoryData]);

  const statusOptions = useMemo(() => {
    const counts: Record<string, number> = { all: advisoryData.length };
    advisoryData.forEach((a) => {
      const s = a.status.toLowerCase();
      counts[s] = (counts[s] || 0) + 1;
    });
    const options = [
      "under_investigation",
      "fixed",
      "not_fixed",
      "confirmed",
      "fix_in_progress",
      "upstream_fix_available",
      "upstream_fix_not_available",
      "wont_fix",
      "false_positive",
    ];
    return [
      { value: "all", label: `All (${counts["all"] || 0})` },
      ...options.map((key) => ({
        value: key,
        label: `${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} (${counts[key] || 0})`,
      })),
    ];
  }, [advisoryData]);

  return (
    <>
      <div className="h-full flex flex-col w-full gap-3">
        <div className="flex justify-between items-center w-full gap-4">
          {/* Search */}
          <div className="flex items-center bg-[#242424] rounded px-3 py-2 max-w-[480px] w-full h-[34px]">
            <Search size={18} className="text-[#6E6E6E] mr-2" />
            <input
              className="bg-transparent outline-none text-[14px] text-[#FAFAFA] placeholder-[#6E6E6E] w-full"
              placeholder="Search by CVE or package name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer">
                  <div className="flex items-center px-2 gap-1">
                    <ArrowsSort size={18} className="mr-1" />
                    <span>Status</span>
                  </div>
                  <div className="w-px h-full bg-[#363636]" />
                  <Button
                    variant="ghost"
                    className="flex items-center px-2 gap-1 h-full rounded-none border-none cursor-pointer"
                    style={{ boxShadow: "none" }}
                  >
                    <span>{statusOptions.find((o) => o.value === status)?.label}</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => {
                      setStatus(opt.value);
                      setCurrentPage(0);
                    }}
                    className={status === opt.value ? "bg-[#333] text-white" : ""}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Severity Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer">
                  <div className="flex items-center px-2 gap-1">
                    <ArrowsSort size={18} className="mr-1" />
                    <span>Severity</span>
                  </div>
                  <div className="w-px h-full bg-[#363636]" />
                  <Button
                    variant="ghost"
                    className="flex items-center px-2 gap-1 h-full rounded-none border-none cursor-pointer"
                    style={{ boxShadow: "none" }}
                  >
                    <span>{severityOptions.find((o) => o.value === severity)?.label}</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {severityOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => {
                      setSeverity(opt.value);
                      setCurrentPage(0);
                    }}
                    className={severity === opt.value ? "bg-[#333] text-white" : ""}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p>{filteredData.length} Advisories</p>

        <div className="flex-grow bg-[#1B1B1B] rounded-lg w-full">
          <DataTable
            isLoading={false}
            data={filteredData}
            columns={columns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <AdvisoryTabSidesheet
        open={sideSheetOpen}
        onClose={() => {
          setSideSheetOpen(false);
          setSelectedAdvisory(null);
        }}
        advisory={selectedAdvisory!}
      />
    </>
  );
}
