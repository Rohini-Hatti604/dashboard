"use client";

import { DataTable } from "@/components/tables/table-component";
import useSbomColumns from "@/components/tables/tags/detail-image-sbom.column";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Tag as TagIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Cpu } from "tabler-icons-react";
import { SBOMTableRow } from "./mockdata";

const TAG_OPTIONS = [
    { label: "Latest", value: "latest" },
];
const ARCH_OPTIONS = [
    { label: "x86", value: "x86" },
    { label: "x64", value: "x64" },
];

export default function SbomTabContent({ image }: { image: SBOMTableRow[] }) {
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState(TAG_OPTIONS[0].value);
    const [arch, setArch] = useState(ARCH_OPTIONS[0].value);
    const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
    const [archDropdownOpen, setArchDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

        const filteredData = useMemo(() => {
        let data = image;
        if (search.trim()) {
            data = data.filter((row) => row.package.toLowerCase().includes(search.toLowerCase()));
        }
        return data;
    }, [search, image]);

    const columns = useSbomColumns();

    return (
        <div className="flex flex-col h-full rounded-lg w-full bg-transparent">
            {/* Header */}
            <div className="flex flex-row justify-between items-center w-full mb-4 gap-4">
                {/* Search */}
                <div className="flex items-center bg-[#242424] rounded px-3 py-2 max-w-[368px] w-full h-[34px]">
                    <Search size={18} className="text-[#6E6E6E] mr-2" />
                    <input
                        className="bg-transparent outline-none text-[14px] text-[#FAFAFA] placeholder-[#6E6E6E] w-full"
                        placeholder="Search..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
                    />
                </div>
                {/* Dropdowns */}
                <div className="flex flex-row gap-6">
                    {/* Tag Dropdown (no filter) */}
                    <DropdownMenu open={tagDropdownOpen} onOpenChange={setTagDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer w-fit">
                                <div className="flex items-center px-2 gap-1 border-r border-[#363636]">
                                    <TagIcon size={16} className="mr-1 text-[#FAFAFA]" />
                                    <span className="text-sm">Tag</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA] focus:outline-none focus:ring-0 hover:bg-[#282828] active:bg-[#282828] cursor-pointer"
                                    style={{ boxShadow: "none" }}
                                >
                                    <span>{TAG_OPTIONS.find(o => o.value === tag)?.label}</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {TAG_OPTIONS.map(opt => (
                                <DropdownMenuItem key={opt.value} onClick={() => { setTag(opt.value); setTagDropdownOpen(false); }}>
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Architecture Dropdown (no filter) */}
                    <DropdownMenu open={archDropdownOpen} onOpenChange={setArchDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer w-fit">
                                <div className="flex items-center px-2 gap-1 border-r border-[#363636]">
                                    <Cpu size={18} className="mr-1 text-[#FAFAFA]" />
                                    <span className="text-sm">Architecture</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA] focus:outline-none focus:ring-0 hover:bg-[#282828] active:bg-[#282828] cursor-pointer"
                                    style={{ boxShadow: "none" }}
                                >
                                    <span>{ARCH_OPTIONS.find(o => o.value === arch)?.label}</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {ARCH_OPTIONS.map(opt => (
                                <DropdownMenuItem key={opt.value} onClick={() => { setArch(opt.value); setArchDropdownOpen(false); }}>
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Table */}
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
    );
} 