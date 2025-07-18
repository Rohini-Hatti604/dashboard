"use client"

import { Bell, Search } from "lucide-react";
import { useContext, useState } from "react";
import { BrandGoogleBigQuery } from "tabler-icons-react";
import AdvancedSearchQueryBuilder from "../../sections/querybuilder/AdvancedSearchQueryBuilder";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { LayoutContext } from "@/components/providers/layout-provider";
import { CommandSquare } from "iconsax-reactjs";

export default function Header() {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [query, setQuery] = useState({ combinator: "and", rules: [] });
    const { searchPlaceholder, buttonIcon } = useContext(LayoutContext)!;
    return (
        <>
            <div className="flex justify-between items-center px-3 py-2 border-b border-[#363636] bg-[transparent] h-[54px]">
                {/* Left: Search and Advanced Search */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center bg-[#242424] rounded px-2 h-[34px] w-[368px]">
                        <Search className="absolute left-2 text-[#6E6E6E] w-4 h-4" />
                        <Input
                            className="pl-5 pr-6 text-[#FAFAFA] h-[34px] text-sm"
                            style={{ background: "transparent" }}
                            placeholder={searchPlaceholder}
                        />
                        {buttonIcon && (<div className="absolute right-2 flex items-center">
                                <CommandSquare color="#fafafa" variant="Bold" className="rounded h-5 w-5" />
                                <div className="h-4 w-4 p-1 bg-[#FAFAFA] flex items-center justify-center rounded ml-1">
                                    <span className="text-black text-sm">K</span>
                                </div>
                        </div>)}
                    </div>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 h-[32px] px-3 rounded border text-sm font-normal cursor-pointer border-[#039BE6] text-[#039BE6] bg-transparent hover:bg-transparent hover:text-[#039BE6] focus:outline-none focus:ring-0 focus:border-[#039BE6] active:bg-transparent active:text-[#039BE6]"
                        style={{ borderColor: "#039BE6" }}
                        onClick={() => setSheetOpen(true)}
                    >
                        Advanced Search
                        <BrandGoogleBigQuery size={16} color="#039BE6" className="ml-2" />
                    </Button>
                    <AdvancedSearchQueryBuilder
                        open={sheetOpen}
                        onOpenChange={setSheetOpen}
                        query={query}
                        setQuery={setQuery}
                    />
                </div>
                {/* Right: Notification and Avatar */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                        <Bell className="w-5 h-5 text-[#FAFAFA]" />
                    </Button>
                    {/* <Avatar /> */}
                </div>
            </div>
        </>
    );
} 