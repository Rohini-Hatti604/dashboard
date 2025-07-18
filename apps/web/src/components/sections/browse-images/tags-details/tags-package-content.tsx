import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Download } from "tabler-icons-react";
import { DataTable } from "../../../tables/table-component";
import useTagPackageColumns from "../../../tables/tags/detail-tag-package.column";
import { Button } from "../../../ui/button";
import { PACKAGE_DATA } from "../mockdata";

export default function TagsPackageContent() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const filteredData = useMemo(() => {
        if (!search.trim()) return PACKAGE_DATA;
        return PACKAGE_DATA.filter(row =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.version.toLowerCase().includes(search.toLowerCase()) ||
            row.repository.toLowerCase().includes(search.toLowerCase()) ||
            row.license.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const columns = useTagPackageColumns();

    return (
        <div className="flex flex-col w-full h-full bg-transparent p-0 overflow-y-auto">
            {/* Header: Search + SBOM Button */}
            <div className="flex flex-row justify-between items-center w-full mb-4 gap-4 px-4">
                {/* Search */}
                <div className="flex items-center bg-[#242424] rounded px-3 py-2 max-w-[480px] w-full h-[34px]">
                    <Search size={18} className="text-[#6E6E6E] mr-2" />
                    <input
                        className="bg-transparent outline-none text-[14px] text-[#FAFAFA] placeholder-[#6E6E6E] w-full"
                        placeholder="Search..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
                    />
                </div>
                {/* SBOM Button */}
                <Button className="flex items-center gap-2 bg-[#039BE6] hover:bg-[#0288c7] text-[#FAFAFA] px-5 py-2 rounded h-[37px] text-sm font-medium shadow-none">
                    <Download size={18} className="mr-1" />
                    SBOM
                </Button>
            </div>
            {/* Table with pagination */}
            <div className="flex-grow bg-[#1B1B1B] rounded-lg w-full px-4">
                <DataTable
                    isLoading={false}
                    data={filteredData}
                    columns={columns}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
} 