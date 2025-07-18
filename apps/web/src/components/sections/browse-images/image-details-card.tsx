"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ImageDetails } from "@/types/browse-images";
import { IconShieldCheckered } from '@tabler/icons-react';
import { Copy, GitPullRequestArrow, Search, Shield, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { AdvisoryTableRow, ProvenanceData, SpecificationsData, TagTableRow, VulnerabilitiesData } from "./mockdata";

export default function ImageDetailsCard({ image }: { image: ImageDetails & { provenance?: ProvenanceData, specifications?: SpecificationsData, vulnerabilitiesData?: VulnerabilitiesData[], advisoriesData?: AdvisoryTableRow[], tagsData?: TagTableRow[] } }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(image.dockerPull);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTags = image.tags?.filter((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    const handleDropdownOpenChange = (open: boolean) => {
        setIsDropdownOpen(open);
        if (!open) {
            setSearchTerm(""); // Reset search when closing
        }
    };
    const getTagClass = (index: number) => {
        const tagNumber = (index % 4) + 1;
        return `tag tag-${tagNumber}`;
    };
    return (
        <div className="flex flex-row justify-between items-center w-full h-[128px] p-[20px] pl-[12px] bg-[#1E2021] rounded-[12px]  mb-8">
            <div className="flex flex-row items-center gap-3 w-fit h-fit">
                <div className="w-[80px] h-[80px] flex items-center justify-center rounded-md">
                    <img src="/assets/card-images/prometheus.png" alt={image.name} className="w-[65px] h-[63px] object-contain" />
                </div>
                <div className="flex flex-col items-start gap-2 w-fit h-fit">
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <div className="flex flex-row items-center gap-3 w-fit h-fit">
                            <span className="text-[18px] font-medium text-[#FAFAFA] leading-[21px] tracking-[0.02em]">{image.name}</span>
                            {image.fips && (
                                <div className="flex flex-row items-center px-2 py-1 gap-1 bg-[rgba(3,155,230,0.15)] border border-[#039BE6] rounded text-xs">
                                    <Shield size={16} className="text-[#FAFAFA] mr-1" />
                                    <span className="text-[#FAFAFA]">FIPS Available</span>
                                </div>
                            )}
                            {image.stigHardened && (
                                <div className="flex flex-row items-center justify-center gap-[6px] px-2 pr-2 py-1 bg-[rgba(245,124,0,0.15)] border border-[#F57C00] rounded text-xs h-[24px]">
                                    <IconShieldCheckered size={16} color="#FAFAFA" stroke={1.5} className="drop-shadow" />
                                    <span className="text-[#FAFAFA] text-[12px] leading-[14px]">STIG Hardened</span>
                                </div>
                            )}
                        </div>
                        <span className="text-xs text-[#FAFAFA] opacity-60">Last updated on {image.lastUpdated}</span>
                    </div>
                    {image.tags && image.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                            {image.tags.slice(0, Math.min(4, image.tags.length)).map((tag, index) => {
                                return <span
                                    key={index}
                                    className={getTagClass(index)}
                                >
                                    {tag}
                                </span>
                            })}
                            {image.tags.length > 4 && (
                                <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="text-xs py-1 px-2 rounded-2xl bg-[#242424] cursor-pointer focus:outline-none"
                                            onClick={() => {
                                                handleDropdownOpenChange(true);
                                            }}
                                        >
                                            Show more
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="right"
                                        align="start"
                                        className="flex flex-col gap-3 p-3 h-[400px]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2 className="font-semibold">Tags {image.tags.length}</h2>
                                            <button
                                                onClick={() => {
                                                    handleDropdownOpenChange(false);
                                                }}
                                                className="p-1 rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {
                                            image.tags.length > 10 && (
                                                <div className="relative flex items-center bg-[#242424] rounded px-2 h-[34px]">
                                                    <Search className="absolute left-2 text-[#6E6E6E] w-4 h-4" />
                                                    <Input
                                                        className="pl-8 pr-12 text-[#FAFAFA] h-[34px] text-sm"
                                                        style={{ background: "transparent" }}
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={(e) => {
                                                            setSearchTerm(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            )
                                        }
                                        <div className="space-y-0.5 flex-grow h-0 overflow-auto">
                                            {filteredTags.map((tag, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    className="cursor-default"
                                                >
                                                    <span className={getTagClass(index)}>
                                                        {tag}
                                                    </span>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Right: Stats and Actions */}
            <div className="flex flex-col items-end gap-5 w-[328px] h-[88px] mb-[12px]">
                <div className="flex flex-row justify-end items-start w-full h-fit">
                    {/* Vulnerabilities */}
                    <div className="flex flex-col w-fit h-fit gap-[6px] pr-[20px] border-r border-[#363636]">
                        <div className="flex flex-row items-center gap-1 w-full">
                            <TriangleAlert size={12} />
                            <span className="text-sm text-[#FAFAFA]">Vulnerabilities</span>
                        </div>
                        <span className="text-[18px] font-medium text-[#E93636] mt-1 self-end">{image.vulnerabilities}</span>
                    </div>

                    <div className="flex flex-col items-center w-fit h-fit gap-[6px] pl-[20px]">
                        <div className="flex flex-row items-center gap-1">
                            <GitPullRequestArrow size={12} />
                            <span className="text-sm text-[#FAFAFA]">Pulls</span>
                        </div>
                        <span className="text-[18px] font-medium text-[#039BE6] mt-1">{image.pulls}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center w-full h-[24px] bg-[#242424] rounded-[4px] px-0 py-0">
                    <span className="text-[#80A6B8] text-[14px] font-normal font-[Rubik] flex-1 px-3 truncate" style={{ letterSpacing: '0.08em' }}>{image.dockerPull}</span>
                    <button
                        className="flex flex-row items-center gap-1 px-2 py-1 bg-[#039BE6] h-[25px] w-[104px] rounded-r-[4px] rounded-l-none cursor-pointer"
                        style={{ fontFamily: 'Rubik' }}
                        onClick={handleCopy}
                        type="button"
                    >
                        <Copy size={12} className="text-[#FAFAFA]" />
                        <span className="text-[#FAFAFA] text-[14px]">{copied ? "Copied!" : "Pull Latest"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
} 