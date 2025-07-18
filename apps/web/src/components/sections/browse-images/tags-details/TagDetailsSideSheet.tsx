import { ImageDetails } from "@/types/browse-images";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Cpu } from "tabler-icons-react";
// Update the import path below if the correct location is different
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SpecificationsData, TagTableRow, VULNERABILITIES_DATA } from "../mockdata";
import TagsPackageContent from "./tags-package-content";
import TagsSpecificationContent from "./tags-specification-content";
import TagsVulnerabilitiesContent from "./tags-vulnerabilities-content";

const ARCH_OPTIONS = [
    { label: "x86", value: "x86" },
    { label: "x64", value: "x64" },
];

const TABS = [
    { key: "package", label: "Package" },
    { key: "specification", label: "Specification" },
    { key: "vulnerabilities", label: "Vulnerabilities" },
];

interface TagDetailsSideSheetProps {
    open: boolean;
    onClose: () => void;
    tag: TagTableRow | null;
    image: ImageDetails & { specifications?: SpecificationsData };
}


export default function TagDetailsSideSheet({ open, onClose, tag, image }: TagDetailsSideSheetProps) {
    const [arch, setArch] = useState(ARCH_OPTIONS[0].value);
    const [tab, setTab] = useState(TABS[0].key);
    const [archDropdownOpen, setArchDropdownOpen] = useState(false);

    if (!image) {
        return (
            <Sheet open={open} onOpenChange={open => { if (!open) onClose(); }}>
                <SheetContent side="right" className="!max-w-[700px] !w-[700px] p-0 flex flex-col h-full bg-[#181A1B]">
                    <div className="flex-1 flex items-center justify-center text-[#6E6E6E] text-lg">
                        Loading...
                    </div>
                </SheetContent>
            </Sheet>
        );
    }
    if (!tag) return null;

    return (
        <Sheet open={open} onOpenChange={open => { if (!open) onClose(); }}>
            <SheetContent side="right" className="!max-w-[700px] !w-[700px] p-0 flex flex-col h-full bg-[#181A1B]">
                {/* Header: Image and Last Updated */}
                <div className="flex items-center gap-4 px-8 pt-2">
                    <div className="w-[56px] h-[56px] flex items-center justify-center rounded-md bg-[#232323]">
                        <img src={"/assets/card-images/prometheus.png"} alt={image.name} className="w-[40px] h-[40px] object-contain" />
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <SheetTitle className="text-lg font-semibold text-[#FAFAFA]">{image.name}</SheetTitle>
                        <span className="text-xs text-[#FAFAFA] opacity-60 whitespace-nowrap">Last updated on {image.lastUpdated}</span>
                    </div>
                </div>
                {/* Tag Name */}
                <div className="px-8 pt-2">
                    <span className="text-lg font-medium text-[#FAFAFA]">{tag.tag}</span>
                </div>
                {/* Architecture and Compressed Size */}
                <div className="flex items-center justify-between px-8">
                    <DropdownMenu open={archDropdownOpen} onOpenChange={setArchDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[34px] text-xs cursor-pointer w-fit">
                                <div className="flex items-center px-2 gap-1">
                                    <Cpu size={18} className="mr-1" />
                                    <span className="text-sm">Architecture</span>
                                </div>
                                <div className="w-px h-full bg-[#363636]" />
                                <div className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA]">
                                    <span>{ARCH_OPTIONS.find(o => o.value === arch)?.label}</span>
                                    <ChevronDown className="w-3 h-3 ml-1" />
                                </div>
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
                    <div className="text-sm text-[#FAFAFA]">
                        Compressed Size: <span className="font-semibold">{tag.compressedSize}</span>
                    </div>
                </div>
                {/* Tabs */}
                <div className="border-b border-[#363636] flex flex-row items-center gap-6 px-8 pt-2 mb-0">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`py-2 px-1 text-sm font-medium transition-colors cursor-pointer ${tab === t.key ? "text-[#039BE6] border-b-2 border-[#039BE6]" : "text-[#FAFAFA]"}`}
                            onClick={() => setTab(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                {/* Tab Content */}
                <div className="flex-grow h-0 overflow-auto flex flex-col">
                    {tab === "package" ? (
                        <TagsPackageContent />
                    ) : tab === "specification" ? (
                        image.specifications ? (
                            <TagsSpecificationContent specifications={image.specifications} />
                        ) : (
                            <div className="text-[#6E6E6E] text-center py-12 text-lg">No specifications data</div>
                        )
                    ) : tab === "vulnerabilities" ? (
                        <TagsVulnerabilitiesContent vulnerabilitiesData={VULNERABILITIES_DATA} />
                    ) : (
                        "Coming soon"
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
} 