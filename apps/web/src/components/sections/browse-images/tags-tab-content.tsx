  "use client";
  import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArrowsSort } from "tabler-icons-react";
import { DataTable } from "../../tables/table-component";
import useTagsColumns from "@/components/tables/images/tags/detail-image-tags.column";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import TagDetailsSideSheet from "./tags-details/TagDetailsSideSheet";
import { TagTableRow } from "./mockdata";

const VARIANT_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Dev", value: "dev" },
    { label: "Non-Dev", value: "non-dev" },
];

export default function TagsTabContent({ image }: { image: any }) {
    const [search, setSearch] = useState("");
    const [variant, setVariant] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const [sideSheetOpen, setSideSheetOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<TagTableRow | null>(null);

    // Filtering
    const filteredData = useMemo(() => {
        let data = image.tagsData || [];
        if (variant !== "all") {
            data = data.filter((row: TagTableRow) => row.variant === variant);
        }
        if (search.trim()) {
            data = data.filter((row: TagTableRow) => row.tag.toLowerCase().includes(search.toLowerCase()));
        }
        return data;
    }, [search, variant]);

    console.log("filteredData:", filteredData);

    // Custom columns with tag click handler
    const columns = useTagsColumns({
        onTagClick: (tag) => {
            setSelectedTag(tag);
            setSideSheetOpen(true);
        }
    });

    

    return (
        <>
            <div className="h-full flex flex-col rounded-lg w-full  bg-transparent">
                {/* Header: Search + Variant Dropdown */}
                <div className="flex flex-row justify-between items-center w-full mb-4 gap-4">
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
                    {/* Variant Dropdown (styled like sort button) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer">
                                <div className="flex items-center px-2 gap-1">
                                    <ArrowsSort size={18} className="mr-1" />
                                    <span>Variants</span>
                                </div>
                                <div className="w-px h-full bg-[#363636]" />
                                <Button
                                    variant="ghost"
                                    className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA] focus:outline-none focus:ring-0 hover:bg-[#282828] active:bg-[#282828] cursor-pointer"
                                    style={{ boxShadow: "none" }}
                                >
                                    <span>{VARIANT_OPTIONS.find(o => o.value === variant)?.label}</span>
                                    <ChevronDown className="w-3 h-3 ml-1" />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {VARIANT_OPTIONS.map(opt => (
                                <DropdownMenuItem key={opt.value} onClick={() => { setVariant(opt.value); setCurrentPage(0); }}>
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                
                {/* Table with built-in pagination */}
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
            <TagDetailsSideSheet
                open={sideSheetOpen}
                onClose={() => setSideSheetOpen(false)}
                tag={selectedTag}
                image={image}
            />
        </>
    );
} 