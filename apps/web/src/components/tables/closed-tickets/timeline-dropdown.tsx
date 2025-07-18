import { PlusSquare } from "lucide-react";
import React from "react";

export type TimelineOption = {
    label: string;
    value: string;
    count: number | string;
};

interface TimelineDropdownProps {
    options: TimelineOption[];
    selected: string;
    onSelect: (value: string) => void;
}

export const TimelineDropdown: React.FC<TimelineDropdownProps> = ({ options, selected, onSelect }) => {
    return (
        <div
            className="flex flex-col justify-center items-start p-0 gap-1 relative w-[180px] bg-[#242424] rounded-[4px] shadow-lg border border-[#363636]"
            style={{ minHeight: 243 }}
        >
            <div className="flex flex-col w-full" style={{ borderBottom: "1px solid #363636" }}>
                {options.map((opt, idx) => (
                    <button
                        key={opt.value}
                        className={`flex flex-row justify-between items-center px-2 py-1 gap-2 w-[164px] h-[28px] mx-2 my-1 rounded-[4px] font-rubik text-[14px] transition-colors duration-100
                          ${selected === opt.value ? "bg-[#323232] text-[#039BE6]" : "bg-transparent text-[#FAFAFA] hover:bg-[#2a2a2a]"}
                        `}
                        style={{ outline: "none", border: "none" }}
                        onClick={() => onSelect(opt.value)}
                    >
                        <span>{opt.label}</span>
                        <span className={selected === opt.value ? "text-[#039BE6]" : "text-[#FFFFFF]"}>{opt.count}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-row items-center px-2 py-2 gap-2 w-full" style={{ minHeight: 35 }}>
                <PlusSquare className="w-[18px] h-[18px] text-[#039BE6]" strokeWidth={2} />
                <span className="text-[14px] font-rubik text-[#039BE6]">Add personal queue</span>
            </div>
        </div>
    );
}; 