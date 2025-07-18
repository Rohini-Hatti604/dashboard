import { ArrowUpDown, ChevronDown, Cog, GitMerge, Link } from "lucide-react";
import { useState } from "react";
import { ChevronRight, DotsCircleHorizontal, Flag, Settings, Share, Trash, UserPlus } from "tabler-icons-react";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";

const sortOptions = ["None", "Priority", "Last Update"];

interface TicketsHeaderProps {
    activeTab: string;
    selectedCount?: number;
}

export default function TicketsHeader({ activeTab, selectedCount = 0 }: TicketsHeaderProps) {
    const [selectedSort, setSelectedSort] = useState("None");
    return (
        <div className="flex justify-between items-center mx-3 py-2 bg-background">
            {/* Left: Title and (optionally) settings */}
            <div className="flex items-center">
                <span className="text-lg font-medium text-[#FAFAFA]">
                    {activeTab === "open"
                        ? "Open Tickets"
                        : activeTab === "my"
                            ? "My Tickets"
                            : "Closed Tickets"}
                </span>
                {activeTab === "open" && (
                    <Button variant="ghost" size="icon" className="ml-1 w-[18px] h-[18px]">
                        <Settings size={18} className="w-4 h-4 text-[#FAFAFA]/50" />
                    </Button>
                )}
                {activeTab === "closed" && (
                    <Button variant="ghost" size="icon" className="ml-1 w-[18px] h-[18px]">
                        <Settings size={18} className="w-4 h-4 text-[#FAFAFA]/50" />
                    </Button>
                )}
                {activeTab === "my" && (
                    <Button variant="ghost" size="icon" className="ml-1 w-[18px] h-[18px]">
                        <Settings className="w-2 h-4 text-[#FAFAFA]/50" />
                    </Button>
                )}
            </div>
            {/* Right: Bulk Actions and Sort */}
            <div className="flex items-center gap-2">
                {/* Bulk Actions Dropdown */}
                {selectedCount > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="bg-[#282828] border-[#363636] text-[#FAFAFA] h-[28px] px-2 text-xs flex items-center gap-2 rounded-md focus:outline-none focus:ring-0 hover:bg-[#282828] active:bg-[#282828] cursor-pointer"
                            >
                                <DotsCircleHorizontal size={18} className="mr-1" />
                                <span>Bulk Actions</span>
                                <ChevronDown size={16} className="ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                                <Link className="w-4 h-4 mr-2" />
                                Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <GitMerge className="w-4 h-4 mr-2" />
                                Merge
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <UserPlus size={18} className="mr-2" />
                                Assign user
                                <ChevronRight size={16} className="ml-auto" />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Flag size={18} className="mr-2" />
                                Priority
                                <ChevronRight size={16} className="ml-auto" />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share size={18} className="mr-2" />
                                Transfer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trash size={18} className="mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                {/* Sort Button */}
                <DropdownMenu>
                        <div className="flex rounded-md overflow-hidden border border-[#363636] bg-[#282828] h-[28px] text-xs">
                            <div className="flex items-center px-2 gap-1">
                                <ArrowUpDown className="w-4 h-4 mr-1" />
                                <span>Sort</span>
                            </div>
                            <div className="w-px h-full bg-[#363636]" />
                    <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center px-2 gap-1 h-full rounded-none border-none bg-transparent text-[#FAFAFA] cursor-pointer"
                                style={{ boxShadow: "none" }}
                            >
                                <span>{selectedSort}</span>
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </Button>
                    </DropdownMenuTrigger>
                        </div>
                    <DropdownMenuContent align="end">
                        {sortOptions.map(option => (
                            <DropdownMenuItem key={option} onClick={() => setSelectedSort(option)}>
                                {option}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
} 