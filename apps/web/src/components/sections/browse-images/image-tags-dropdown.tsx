import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";

interface ImageTagsDropdownProps {
    tags: string[];
    onTagClick?: (tag: string) => void;
}

const ImageTagsDropdown: React.FC<ImageTagsDropdownProps> = ({ tags, onTagClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredTags = tags?.filter(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDropdownOpenChange = (open: boolean) => {
        setIsDropdownOpen(open);
        if (!open) {
            setSearchTerm(""); // Reset search when closing
            setIsFocused(false);
        }
    };

    const tagColors = ["bg-[#B89F39]", "bg-[#B57A59]", "bg-[#7A4C74]"];

    // Create a stable mapping of tags to colors to prevent re-rendering issues
    const tagColorMap = useMemo(() => {
        const map = new Map<string, string>();
        tags?.forEach((tag, index) => {
            map.set(tag, tagColors[index % tagColors.length]);
        });
        return map;
    }, [tags]);

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
            <DropdownMenuTrigger asChild>
                <button
                    className="text-xs py-1 px-2 rounded-2xl bg-[#242424] cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownOpenChange(true);
                    }}
                >
                    +{tags.length - 3}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                align="start"
                className="flex flex-col gap-3 h-[400px] w-[300px] p-3"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Tags ({tags.length})</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDropdownOpenChange(false);
                        }}
                        className="p-1 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {
                    tags.length > 10 && (
                        <div className="relative w-full mb-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E6E6E]" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Search tags..."
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    className="w-full pl-10 pr-4 py-2 bg-transparent border rounded-md text-sm text-[#FAFAFA] placeholder-[#6E6E6E] transition-colors duration-200 focus-visible:ring-0"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )
                }
                <div className="space-y-0.5 flex-grow h-0 overflow-auto">
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag) => (
                            <DropdownMenuItem
                                key={tag}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick?.(tag);
                                }}
                                className="cursor-default"
                            >
                                <span
                                    className={`inline-block ${tagColorMap.get(tag)} text-xs px-2 py-1 rounded-2xl border border-muted`}
                                >
                                    {tag}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : searchTerm.trim() !== "" ? (
                        <div className="flex items-center justify-center py-4 text-sm text-[#6E6E6E]">
                            No tags found
                        </div>
                    ) : null}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ImageTagsDropdown;
