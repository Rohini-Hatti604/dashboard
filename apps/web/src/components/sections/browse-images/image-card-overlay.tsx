import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GitPullRequestArrow, Search, Shield, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ImageCard } from "../../../types/browse-images";

interface ImageCardOverlayProps {
    image: ImageCard;
}

const ImageCardOverlay: React.FC<ImageCardOverlayProps> = ({ image }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredTags = image.tags?.filter(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDropdownOpenChange = (open: boolean) => {
        setIsDropdownOpen(open);
        if (!open) {
            setSearchTerm(""); // Reset search when closing
            setIsFocused(false);
        }
    };
    const getTagClass = (index: number) => {
        const tagNumber = (index % 4) + 1;
        return `tag tag-${tagNumber}`;
    };
    return (
        <div
            className={`absolute inset-0 flex flex-col justify-center gap-2 border border-muted bg-[#1e2021] backdrop-blur-sm rounded-lg px-6 z-10 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                }`}
            role="tooltip"
            aria-label={`Details for ${image.name}`}
        >
            <div className="flex space-x-2">
                <div className="flex items-center rounded-md">
                    <Image
                        src={image.imageUrl}
                        alt={image.name}
                        width={50}
                        height={30}
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col justify-around my-2">
                    <h3 className="text-lg font-semibold text-[#FAFAFA] truncate">{image.name}</h3>
                    <p className="text-sm text-[#6E6E6E]">{image.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center px-2 py-1 gap-1 bg-[rgba(3,155,230,0.15)] border border-[#039BE6] rounded text-xs">
                    <Shield size={16} className="text-[#FAFAFA] mr-1" />
                    <span className="text-[#FAFAFA]">FIPS Available</span>
                </div>
                <div className="flex gap-1">
                    <TriangleAlert size={16} className="text-[#FAFAFA]" />
                    <span className="text-sm text-red-600 font-bold">2</span>
                </div>
                <div className="flex gap-1">
                    <GitPullRequestArrow size={16} />
                    <span className="text-sm text-[#039BE6] font-bold">21.8K</span>
                </div>
            </div>

            <p className="text-xs text-[#6E6E6E]">Last updated on 17 Jun, 2025</p>

            {/* Tags */}
            {image.tags && image.tags.length > 0 && (
                <div className="flex items-center gap-1">
                    {image.tags.slice(0, Math.min(3, image.tags.length)).map((tag, index) => {
                        return <span
                            key={index}
                            className={getTagClass(index)}
                        >
                            {tag}
                        </span>
                    })}
                    {image.tags.length > 3 && (
                        <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="text-xs py-1 px-2 rounded-2xl bg-[#242424] cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDropdownOpenChange(true);
                                    }}
                                >
                                    +{image.tags.length - 3}
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
                                    <h2 className="font-semibold">Tags ({image.tags.length})</h2>
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
                                    image.tags.length > 10 && (
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
                                                    className={`w-full pl-10 pr-4 py-2 bg-transparent border rounded-md text-sm text-[#FAFAFA] placeholder-[#6E6E6E] transition-colors duration-200 focus:outline-none ${isFocused
                                                        ? 'border-[#039BE6] ring-1 ring-[#039BE6]/30'
                                                        : 'border-[#6E6E6E] hover:border-[#8E8E8E]'
                                                        }`}
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
                                                onClick={(e) => e.stopPropagation()}
                                                className="cursor-default"
                                            >
                                                <span className={getTagClass(filteredTags.indexOf(tag))}>
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
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageCardOverlay;
