import useAdvisoryPackagesColumn from "@/components/tables/images/advisory-packages.column";
import { DataTable } from "@/components/tables/table-component";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ADVISORY_PACKAGES_DATA } from "./mockdata";

export default function AdvisoryPackageContent() {
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);

    const columns = useAdvisoryPackagesColumn();
    const statusOptions = [
        { value: "all", label: "All Package" },
        { value: "fixed", label: "Fixed" },
        { value: "pending Upstream Fix", label: "Pending upstream fix" },
        { value: "fix Not Planned", label: "Fix not planned" },
        { value: "unaffected", label: "Unaffected" },
        { value: "affected", label: "Affected" },
        { value: "under Review", label: "Under review" },
    ];

    // Filter data based on status
    const filteredData = status === "all"
        ? ADVISORY_PACKAGES_DATA
        : ADVISORY_PACKAGES_DATA.filter(pkg =>
            pkg.status.replace(/\s+/g, '').toLowerCase() === status.replace(/\s+/g, '').toLowerCase()
        );

    return (
        <div className="flex flex-col h-full w-full gap-3">
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="cursor-pointer rounded">
                            <p>{statusOptions.find((option) => option.value === status)?.label}</p>
                            <ChevronDown size={16} className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {statusOptions.map((option) => (
                            <DropdownMenuItem key={option.value} onClick={() => setStatus(option.value)}>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <span>Showing {filteredData.length} of {ADVISORY_PACKAGES_DATA.length}</span>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                isLoading={false}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}