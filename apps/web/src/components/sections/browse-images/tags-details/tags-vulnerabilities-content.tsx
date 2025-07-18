import GaugeChart from "@/components/charts/gauge-chart";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { BrandGoogleBigQuery, ChevronDown, Flame } from "tabler-icons-react";
import { DataTable } from "../../../tables/table-component";
import useTagVulnerabilitiesColumns from "../../../tables/tags/detail-tag-vulnerabilities.column";
import { Button } from "../../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import AdvancedSearchQueryBuilder from "../../querybuilder/AdvancedSearchQueryBuilder";
import { VulnerabilityTableRow } from "../mockdata";

const SEVERITY_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Emergency", value: "emergency" },
];

export default function TagsVulnerabilitiesContent({ vulnerabilitiesData }: { vulnerabilitiesData: VulnerabilityTableRow[] }) {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [query, setQuery] = useState({ combinator: "and", rules: [] });
    const [open, setOpen] = useState(false);

    const filteredData = useMemo(() => {
        let data = vulnerabilitiesData;
        if (severity !== "all") {
            data = data.filter(row => row.severity.toLowerCase() === severity);
        }
        if (search.trim()) {
            data = data.filter(row => row.cveId.toLowerCase().includes(search.toLowerCase()));
        }
        return data;
    }, [search, severity, vulnerabilitiesData]);

    const columns = useTagVulnerabilitiesColumns();

    return (
        <div className="flex flex-col w-full h-full bg-transparent px-5 py-2 overflow-y-auto">
            {/* Header: Search + Severity Dropdown + Advanced Search */}
            <div className="flex flex-row justify-between items-center w-full mb-4 gap-4 px-2">
                {/* Search */}
                <div className="flex items-center bg-[#242424] rounded px-3 py-2 w-full h-fit">
                    <Search size={18} className="text-[#6E6E6E] mr-2" />
                    <input
                        className="bg-transparent outline-none text-[14px] text-[#FAFAFA] placeholder-[#6E6E6E] w-full"
                        placeholder="Search..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
                    />
                </div>
                {/* Severity Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer w-fit min-w-[160px]">
                            <div className="flex items-center px-2 gap-1">
                                <Flame size={16} className="mr-1 text-[#FAFAFA]" />
                                <span className="text-sm">Severity</span>
                            </div>
                            <div className="w-px h-full bg-[#363636]" />
                            <Button
                                variant="ghost"
                                className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA] focus:outline-none focus:ring-0 hover:bg-[#282828] active:bg-[#282828] cursor-pointer"
                                style={{ boxShadow: "none" }}
                            >
                                <span>{SEVERITY_OPTIONS.find(o => o.value === severity)?.label}</span>
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {SEVERITY_OPTIONS.map(opt => (
                            <DropdownMenuItem key={opt.value} onClick={() => { setSeverity(opt.value); setCurrentPage(0); }}>
                                {opt.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Advanced Search Button */}
                <Button
                    variant="ghost"
                    className="flex items-center justify-center border border-[#039BE6] rounded h-[34px] w-[40px] p-0 bg-transparent hover:bg-[#181A1B] cursor-pointer"
                    style={{ minWidth: 0 }}
                    onClick={() => setSheetOpen(true)}
                >
                    <BrandGoogleBigQuery size={24} className="text-[#039BE6]" />
                </Button>
                <AdvancedSearchQueryBuilder
                    open={sheetOpen}
                    onOpenChange={setSheetOpen}
                    query={query}
                    setQuery={setQuery}
                />
            </div>
            {/* Table with pagination */}
            <div className="flex-grow bg-[#1B1B1B] rounded-lg w-full px-2">
                <DataTable
                    isLoading={false}
                    data={filteredData}
                    columns={columns}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    renderExpandedRow={(row) => {
                        const vuln = row.original;
                        console.log("Expanded Row Data:", vuln);
                        return (
                            <div className="flex flex-col gap-3 dark:bg-[#161616] px-4 py-4">
                                <div className="w-full h-[220px] rounded-b-lg flex gap-3">
                                    <div className="flex-1 h-full border rounded overflow-hidden p-2">
                                        <GaugeChart value={3.5} title="Severity Score" severity={vuln.severity.toLowerCase()} maxValue={10} />
                                    </div>
                                    <div className="flex-1 flex flex-col rounded justify-around border">
                                        <div className="flex justify-between mx-6">
                                            <span className="text-sm font-bold">Package</span>
                                            <div className="text-sm">{vuln.package}</div>
                                        </div>
                                        <div className="flex justify-between mx-6">
                                            <span className="text-sm font-bold">Version</span>
                                            <div className="text-sm">{vuln.version}</div>
                                        </div>
                                        <div className="flex justify-between mx-6">
                                            <span className="text-sm font-bold">Fixed version</span>
                                            <div className="text-sm">{vuln.fixedVersion || '-'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <h2 className="text-sm font-bold mb-1">Description</h2>
                                    <p>{vuln.description || "No description available"}</p>
                                </div>
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <button className="text-sm flex items-center gap-1 cursor-pointer" onClick={() => setOpen(!open)}>
                                            <p>References</p>
                                            <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : ""}`} />
                                        </button>
                                        {vuln.references && vuln.references.length > 0 && open ? (
                                            <>
                                                {vuln.references.map((ref: string, index: number) => (
                                                    <div key={index} className="text-[#80A6B8] hover:underline">
                                                        <a href={ref} target="_blank" rel="noopener noreferrer">{ref}</a>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (open && <p className="text-gray-500">No references available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
} 