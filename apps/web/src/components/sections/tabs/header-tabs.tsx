import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronDown, SquarePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
    key: string;
    label: string;
    dropdown: boolean;
    href?: string;
    dropdownContent?: { title: string; value?: string }[];
}

interface HeaderTabsProps {
    tabs: TabItem[];
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export default function HeaderTabs({ tabs, activeTab, setActiveTab }: HeaderTabsProps) {
    const pathname = usePathname();

    // Determine active tab for route-based tabs
    let routeActiveTab: string | undefined = undefined;
    const hrefTabs = tabs.filter(tab => tab.href);
    if (hrefTabs.length > 0) {
        for (const tab of hrefTabs) {
            if (tab.href && pathname.startsWith(tab.href)) {
                routeActiveTab = tab.key;
                break;
            }
        }
    }

    return (
        <div className="flex gap-2 bg-transparent p-0">
            {tabs.map((tab) => {
                const isRouteTab = !!tab.href;
                const isActive = isRouteTab
                    ? routeActiveTab === tab.key
                    : activeTab === tab.key;
                const tabClass = clsx(
                    "px-5 py-3 text-sm font-medium flex items-center gap-2 focus:outline-none transition border-b-2 rounded-none bg-transparent cursor-pointer",
                    isActive
                        ? "border-[#039BE6] text-[#039BE6]"
                        : "border-transparent text-[#FAFAFA] opacity-80 hover:opacity-100"
                );
                if (isRouteTab) {
                    return (
                        <Link key={tab.key} href={tab.href!} className={tabClass}>
                            {tab.label}
                            {tab.dropdown && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <ChevronDown className={clsx("w-4 h-4 cursor-pointer", isActive ? "text-[#039BE6]" : "text-[#FAFAFA]")} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="flex flex-col gap-2 p-2 overflow-x-hidden" >
                                        {tab.dropdownContent?.map((item, index, arr) => (
                                            <div key={index}>
                                                <DropdownMenuItem className="flex flex-col">
                                                    <p className="flex justify-between w-full"><span>{item.title}</span> <span>{item.value ? item.value : "0"}</span></p>
                                                </DropdownMenuItem>
                                                {index === arr.length - 1 && <>
                                                    <hr className="-mx-2 mb-2" />
                                                    <DropdownMenuItem className="flex gap-2 items-center">
                                                        <SquarePlus className="text-[#039BE6]" size={18} />
                                                        <span className="text-[#039BE6]">Add personal queue</span>
                                                    </DropdownMenuItem>
                                                </>}
                                            </div>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </Link>
                    );
                } else {
                    return (
                        <button
                            key={tab.key}
                            className={tabClass}
                            onClick={() => setActiveTab && setActiveTab(tab.key)}
                            type="button"
                        >
                            {tab.label}
                            {tab.dropdown && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <ChevronDown className={clsx("w-4 h-4 cursor-pointer", isActive ? "text-[#039BE6]" : "text-[#FAFAFA]")} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="flex flex-col gap-2 p-2 overflow-x-hidden" >
                                        {tab.dropdownContent?.map((item, index, arr) => (
                                            <div key={index}>
                                                <DropdownMenuItem className="flex flex-col">
                                                    <p className="flex justify-between w-full"><span>{item.title}</span> <span>{item.value ? item.value : "0"}</span></p>
                                                </DropdownMenuItem>
                                                {index === arr.length - 1 && <>
                                                    <hr className="-mx-2 mb-2" />
                                                    <DropdownMenuItem className="flex gap-2 items-center">
                                                        <SquarePlus className="text-[#039BE6]" size={18} />
                                                        <span className="text-[#039BE6]">Add personal queue</span>
                                                    </DropdownMenuItem>
                                                </>}
                                            </div>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </button>
                    );
                }
            })}
        </div>
    );
} 