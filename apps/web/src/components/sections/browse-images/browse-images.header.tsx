import { LayoutGrid, List } from "tabler-icons-react";
import { GridLayoutType } from "../../../types/browse-images";

const BrowseImagesHeader = ({
    activeTab,
    onGridLayoutChange,
    gridLayout,
}: {
    activeTab: string;
    onGridLayoutChange?: (layout: GridLayoutType) => void;
    gridLayout: GridLayoutType;
}) => {
    const handleLayoutChange = (layout: GridLayoutType) => {
        onGridLayoutChange?.(layout);
    };

    return (
        <div className="flex justify-between items-center px-3 py-2 bg-background">
            <div className="flex items-center">
                <span className="text-lg font-medium text-[#FAFAFA]">
                    {activeTab === "container-images" ? "Browse Images" : activeTab === "virtual-machines" ? "Virtual Machines" : "Packages"}
                </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <span>Showing 20 of 398 images</span>
                <div className="flex items-center justify-between p-1 bg-[#282828] rounded overflow-hidden">
                    <button
                        onClick={() => handleLayoutChange("list")}
                        className={`p-0.5 transition-colors cursor-pointer rounded ${gridLayout === "list" ? "bg-[#363636] text-[#FAFAFA]" : "text-[#6E6E6E]"}`}
                        title="List View"
                    >
                        <List size={22} />
                    </button>
                    <button
                        onClick={() => handleLayoutChange("grid")}
                        className={`p-0.5 transition-colors cursor-pointer rounded ${gridLayout === "grid" ? "bg-[#363636] text-[#FAFAFA]" : "text-[#6E6E6E]"}`}
                        title="Grid View"
                    >
                        <LayoutGrid size={22} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrowseImagesHeader