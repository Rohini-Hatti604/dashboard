import { Copy } from "lucide-react";
import { useState } from "react";
import { SpecificationsData } from "../mockdata";

interface TagsSpecificationContentProps {
    specifications: SpecificationsData;
}

const fieldRows = [
    { label: "Has apk?", value: (spec: SpecificationsData) => spec.apk || "-" },
    { label: "Has a shell?", value: (spec: SpecificationsData) => spec.shell || "-" },
    { label: "User", value: () => "–" },
    { label: "Environment variables", value: (spec: SpecificationsData) => spec.environmentVariables || "–" },
    { label: "Entrypoint", value: (spec: SpecificationsData) => spec.entrypoint || "–" },
    { label: "CMD", value: (spec: SpecificationsData) => spec.cmd || "–" },
    { label: "Volumes", value: (spec: SpecificationsData) => spec.volumes || "–" },
    { label: "Working directory", value: (spec: SpecificationsData) => spec.workingDirectory || "–" },
    { label: "Stop signal", value: (spec: SpecificationsData) => spec.stopSignal || "–" },
];

const TagsSpecificationContent = ({ specifications }: TagsSpecificationContentProps) => {
    const [copied, setCopied] = useState(false);
    const rawConfiguration = specifications.rawConfiguration.join("\n");
    const handleCopy = () => {
        navigator.clipboard.writeText(rawConfiguration);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div className="flex-1 flex flex-col items-start px-5 md:px-8 py-4 gap-5 w-full overflow-y-auto">
            {/* Main fields */}
            <div className="flex flex-col gap-6 w-full">
                {/* First two rows (Has apk, Has a shell) */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Has apk?</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.apk || "no"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Has a shell?</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.shell || "no"}</span>
                    </div>
                </div>
                <div className="border-b border-[#363636] w-full" />
                {/* Other fields */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">User</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">–</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Environment variables</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal whitespace-pre-line leading-[18px]">{specifications.environmentVariables || "–"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Entrypoint</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.entrypoint || "–"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">CMD</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.cmd || "–"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Volumes</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.volumes || "–"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Working directory</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.workingDirectory || "–"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-6 w-full">
                        <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Stop signal</span>
                        <span className="flex-1 text-[12px] text-[#FAFAFA] font-normal">{specifications.stopSignal || "–"}</span>
                    </div>
                </div>
                <div className="border-b border-[#363636] w-full" />
            </div>
            {/* Raw configuration */}
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-center gap-6 w-full">
                    <span className="flex-shrink-0 text-[14px] text-[#FAFAFA] font-normal">Raw configuration</span>
                </div>
                <div className="relative bg-[#242424] border border-[#363636] rounded-lg p-6 w-full flex flex-row items-start gap-2 mt-2">
                    <pre className="text-[12px] text-[#80A6B8] font-mono whitespace-pre-wrap mb-0 flex-1 leading-[18px] tracking-wide">{rawConfiguration}</pre>
                    <button
                        className="absolute top-3 right-3 p-1 bg-[#80A6B8]/25 rounded-full hover:bg-[#80A6B8]/40 transition"
                        title="Copy"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <span className="text-[#FAFAFA] text-xs">Copied!</span>
                        ) : (
                            <Copy size={16} className="text-[#80A6B8]" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagsSpecificationContent;
