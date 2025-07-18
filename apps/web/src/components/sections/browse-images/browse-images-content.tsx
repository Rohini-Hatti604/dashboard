'use client';

import { LayoutContext } from "@/components/providers/layout-provider";
import BrowseImagesHeader from "@/components/sections/browse-images/browse-images.header";
import Pagination from "@/components/sections/pagination/pagination.component";
import HeaderTabs from "@/components/sections/tabs/header-tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, GitPullRequestArrow, Search, Shield, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useHotkeys } from 'react-hotkeys-hook';
import { FilterSection, GridLayoutType, ImageCard } from "../../../types/browse-images";
import ImageCardOverlay from "./image-card-overlay";
import ImageTagsDropdown from "./image-tags-dropdown";

const BrowseImagesContent = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("container-images");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [gridLayout, setGridLayout] = useState<GridLayoutType>("grid");
    const { setPlaceholder, buttonIcon, setButtonIcon } = useContext(LayoutContext)!;

    useHotkeys(
        "ctrl+k", () => {
            alert("Ctrl+K pressed");
        }
    );

    const tabs = [
        { key: "container-images", label: "Container Images", dropdown: false },
        { key: "virtual-machines", label: "Virtual Machines", dropdown: false },
        { key: "packages", label: "Packages", dropdown: false },
    ];

    // Mock filter data
    const filterSections: FilterSection[] = [
        {
            id: "operating-systems",
            title: "Operating Systems",
            options: [
                { id: "ubuntu", label: "Ubuntu" },
                { id: "alpine", label: "Alpine" },
                { id: "debian", label: "Debian" },
                { id: "centos", label: "CentOS" },
                { id: "fedora", label: "Fedora" },
            ]
        },
        {
            id: "categories",
            title: "Categories",
            options: [
                { id: "web-servers", label: "Web Servers" },
                { id: "databases", label: "Databases" },
                { id: "development", label: "Development" },
                { id: "monitoring", label: "Monitoring" },
                { id: "security", label: "Security" },
            ]
        },
        {
            id: "applications",
            title: "Applications",
            options: [
                { id: "nginx", label: "Nginx" },
                { id: "apache", label: "Apache" },
                { id: "mysql", label: "MySQL" },
                { id: "postgresql", label: "PostgreSQL" },
                { id: "redis", label: "Redis" },
            ]
        },
        {
            id: "architecture",
            title: "Architecture",
            options: [
                { id: "amd64", label: "AMD64" },
                { id: "arm64", label: "ARM64" },
                { id: "arm", label: "ARM" },
            ]
        }
    ];

    const imageUrl = [
        {
            label: "Golang",
            description: "Programming Language & Development",
            url: "/assets/card-images/golang.png"
        },
        {
            label: "PostgreSQL",
            description: "Relational Database & Storage",
            url: "/assets/card-images/postgresql.png"
        },
        {
            label: "Python",
            description: "Programming Language & Scripting",
            url: "/assets/card-images/python.png"
        },
        {
            label: "Jenkins",
            description: "Programming Language & Development",
            url: "/assets/card-images/jenkins.png"
        },
        {
            label: "Prometheus",
            description: "Monitoring & Metrics",
            url: "/assets/card-images/prometheus.png"
        },
        {
            label: "Nginx",
            description: "Web Server & Reverse Proxy",
            url: "/assets/card-images/nginx.png"
        },
        {
            label: "Cassandra",
            description: "NoSQL Database & Storage",
            url: "/assets/card-images/cassandra.png"
        },
        {
            label: "Slack",
            description: "Messaging & Collaboration",
            url: "/assets/card-images/slack.png"
        },
        {
            label: "Deepseek",
            description: "Search Engine & Analytics",
            url: "/assets/card-images/deepseek.png"
        }
    ];

    const mockImages: ImageCard[] = Array.from({ length: 50 }, (_, i) => {
        const tags = [
            ["Web", "Server", "Nginx", "Load-Balancer", "Prometheus", "Grafana", "Monitoring", "Metrics", "Analytics", "Logging", "Observability", "Security", "SSL", "Encryption"],
            ["Database", "Sql", "Mysql"],
            ["Development", "Nodejs", "Javascript"],
            ["Monitoring", "Prometheus", "Grafana"],
            ["Security", "Ssl", "Encryption"],
            ["Networking", "Load-Balancer", "Nginx"],
            ["Networking", "Load-Balancer", "Nginx"],
            ["Networking", "Load-Balancer", "Nginx"],
            ["Networking", "Load-Balancer", "Nginx"],
            ["Networking", "Load-Balancer", "Nginx"]
        ];

        const randomIndex = i % 9;

        return {
            id: `image-${i + 1}`,
            name: imageUrl[randomIndex].label,
            description: imageUrl[randomIndex].description,
            imageUrl: imageUrl[randomIndex].url,
            tags: tags[randomIndex],
        };
    });

    const paginatedImages = mockImages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const toggleDropdown = (sectionId: string) => {
        setOpenDropdown(openDropdown === sectionId ? null : sectionId);
    };

    const handleGridLayoutChange = (layout: GridLayoutType) => {
        setGridLayout(layout);
    };

    const handleSearchChange = (sectionId: string, value: string) => {
        setSearchTerms(prev => ({ ...prev, [sectionId]: value }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setItemsPerPage(newPageSize);
        // Reset to first page when changing page size
        setCurrentPage(0);
    };

    const handleFilterChange = (sectionId: string, optionId: string, checked: boolean) => {
        setSelectedFilters(prev => {
            const currentFilters = prev[sectionId] || [];
            if (checked) {
                return { ...prev, [sectionId]: [...currentFilters, optionId] };
            } else {
                return { ...prev, [sectionId]: currentFilters.filter(id => id !== optionId) };
            }
        });
    };

    const getFilteredOptions = (section: FilterSection) => {
        const searchTerm = searchTerms[section.id] || '';
        return section.options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    const getTagClass = (index: number) => {
        const tagNumber = (index % 4) + 1;
        return `tag tag-${tagNumber}`;
    };

    useEffect(() => {
        setPlaceholder("Search...");
        if (!buttonIcon) {
            setButtonIcon(true);
        }
    }, [setPlaceholder]);

    return (
        <div className="flex flex-col h-full">
            <div className="border-b">
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            </div>
            <BrowseImagesHeader activeTab={activeTab} onGridLayoutChange={handleGridLayoutChange} gridLayout={gridLayout} />
            <div className="p-2 flex-grow">
                <div className="grid grid-cols-5 gap-4 h-full">
                    <div className="col-span-1 space-y-4 flex flex-col h-full ">
                        {filterSections.map((section) => (
                            <div key={section.id} className="bg-[#1a1a1a] rounded-lg">
                                <button
                                    onClick={() => toggleDropdown(section.id)}
                                    className={`w-full flex items-center justify-between text-[#6E6E6E] p-3 text-left ${openDropdown === section.id ? "border border-[#FF8C65] text-[#FAFAFA] bg-[#FF8C6540]" : "border border-border"}  transition-colors rounded cursor-pointer`}
                                >
                                    <span className="text-sm font-medium">{section.title}</span>
                                    {openDropdown === section.id ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Filter Dropdown */}
                                {openDropdown === section.id && (
                                    <div className="px-3 py-3 space-y-2">
                                        {/* Search Input */}
                                        <div className="relative flex items-center rounded">
                                            <Search className="absolute left-2 text-[#6E6E6E] w-3 h-3" />
                                            <Input
                                                placeholder={`Search`}
                                                value={searchTerms[section.id] || ''}
                                                onChange={(e) => handleSearchChange(section.id, e.target.value)}
                                                className="pl-8 rounded border-none shadow-none text-[#FAFAFA] placeholder:text-[#6E6E6E] placeholder:text-xs h-7 ring-0 focus:ring-0 focus:border-none outline-none focus:outline-none focus:shadow-none"
                                            />
                                        </div>
                                        {/* Select All Option */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${section.id}-select-all`}
                                                checked={getFilteredOptions(section).length > 0 && getFilteredOptions(section).every(option =>
                                                    selectedFilters[section.id]?.includes(option.id)
                                                )}
                                                onCheckedChange={(checked) => {
                                                    const filteredOptions = getFilteredOptions(section);
                                                    if (checked) {
                                                        // Select all filtered options
                                                        setSelectedFilters(prev => ({
                                                            ...prev,
                                                            [section.id]: [...new Set([...(prev[section.id] || []), ...filteredOptions.map(option => option.id)])]
                                                        }));
                                                    } else {
                                                        // Deselect all filtered options
                                                        setSelectedFilters(prev => ({
                                                            ...prev,
                                                            [section.id]: (prev[section.id] || []).filter(id =>
                                                                !filteredOptions.some(option => option.id === id)
                                                            )
                                                        }));
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor={`${section.id}-select-all`}
                                                className="text-sm text-[#FAFAFA] cursor-pointer flex-1 font-medium"
                                            >
                                                Select All
                                            </label>
                                        </div>
                                        {/* Checkboxes */}
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {getFilteredOptions(section).map((option) => (
                                                <div key={option.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`${section.id}-${option.id}`}
                                                        checked={selectedFilters[section.id]?.includes(option.id) || false}
                                                        onCheckedChange={(checked) =>
                                                            handleFilterChange(section.id, option.id, checked as boolean)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`${section.id}-${option.id}`}
                                                        className="text-sm text-[#FAFAFA] cursor-pointer flex-1"
                                                    >
                                                        <span>{option.label}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="col-span-4 flex flex-col h-full ">
                        <div className={`flex-grow h-0 overflow-auto ${gridLayout === "grid" ? "grid grid-cols-3 gap-3" : "space-y-3"}`}>
                            {paginatedImages.map((image) => {
                                if (gridLayout === "grid") {
                                    return (
                                        <Card
                                            className="p-4 group gap-2 relative h-[200px] bg-[#1e2021] rounded-lg border-transparent hover:border-border cursor-pointer transition-all duration-300"
                                            key={image.id}
                                            onClick={() => router.push(`/images/${image.id}/details`)}
                                        >
                                            <div className="h-16 rounded-md flex items-center justify-center">
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={image.name}
                                                    width={50}
                                                    height={30}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-[#FAFAFA] truncate text-center">{image.name}</h3>
                                                <p className="text-sm text-[#6E6E6E] mt-1 line-clamp-2 text-center">{image.description}</p>
                                            </div>
                                            <ImageCardOverlay image={image} />
                                        </Card>

                                    );
                                }

                                return (
                                    <Card
                                        className="bg-[#1E2021] h-36 rounded-lg border border-[#363636] hover:border-[#4a4a4a] transition-colors cursor-pointer p-4 flex-row justify-between"
                                        key={image.id}
                                        onClick={() => router.push(`/images/${image.id}/details`)}
                                    >
                                        <div className="flex items-start gap-5">
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.name}
                                                width={40}
                                                height={30}
                                                className="object-contain"
                                            />

                                            <div className="flex-1 space-y-1">
                                                <h3 className="text-lg font-medium text-[#FAFAFA]">{image.name}</h3>
                                                <p className="text-xs font-extralight text-[#FAFAFA]/95 ">By <span className="text-[#039BE6] underline">mcp</span> <b>.</b> Updated 5 days ago</p>
                                                <p className="text-xs text-[#FAFAFA]/50 pt-1">{image.description}</p>
                                                {/* Tags */}
                                                {image.tags && image.tags.length > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        {image.tags.slice(0, Math.min(3, image.tags.length)).map((tag, index) => (
                                                            <span
                                                                key={tag}
                                                                className={getTagClass(index)}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {image.tags.length > 3 && (
                                                            <ImageTagsDropdown tags={image.tags} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="border-l flex flex-col gap-5 w-[200px] h-full px-2">
                                            <div className="flex flex-row w-[150px] items-center px-2 py-1 gap-1 bg-[rgba(3,155,230,0.15)] border border-[#039BE6] rounded text-xs">
                                                <Shield size={16} className="text-[#FAFAFA] mr-1" />
                                                <span className="text-[#FAFAFA]">FIPS Available</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <GitPullRequestArrow size={12} />
                                                    <p className="text-sm text-[#FAFAFA]">Pulls</p>
                                                </div>
                                                <p className="text-sm text-right text-[#039BE6] font-bold">21.8K</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-row items-center gap-1 w-full">
                                                    <TriangleAlert size={12} />
                                                    <span className="text-sm text-[#FAFAFA]">Vulnerabilities</span>
                                                </div>
                                                <p className="text-sm text-red-600 font-bold">12</p>
                                            </div>
                                        </div>
                                    </Card>

                                );
                            })}
                        </div>

                        {/* Pagination Footer */}
                        <div className="mt-3 border-[#363636]">
                            <Pagination
                                totalItems={mockImages.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                paginate={setCurrentPage}
                                onPageSizeChange={handlePageSizeChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BrowseImagesContent;
