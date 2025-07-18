"use client";

import { ChevronDown, Copy, Tag } from "lucide-react";
import { useState } from "react";

import { SpecificationsData } from "./mockdata";

interface SpecificationTabContentProps {
    specifications: SpecificationsData;
}

const SpecificationTabContent = ({ specifications }: SpecificationTabContentProps) => {
    const [copied, setCopied] = useState(false);
    const rawConfiguration = specifications.rawConfiguration.join("\n");
    const handleCopy = () => {
        navigator.clipboard.writeText(rawConfiguration);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div className="flex flex-col gap-3 text-sm">
            <div className="self-start py-1 flex dark:bg-secondary-foreground rounded">
                <button onClick={() => { console.log("Tag Clicked!!!") }} className="flex gap-2 px-2 py-1 cursor-pointer border-r">
                    <Tag size={16} />
                    <span className="text-sm">Tag</span>
                </button>
                <button className="flex gap-2 px-2 py-1 items-center cursor-pointer">
                    <span>Latest</span>
                    <ChevronDown size={16} />
                </button>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>APK version</p>
                <p>{specifications.apk}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Shell</p>
                <p>{specifications.shell}</p>
            </div>
            <hr />
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Environment variables</p>
                <p>{specifications.environmentVariables ? specifications.environmentVariables : "-"}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Entrypoint</p>
                <p>{specifications.entrypoint ? specifications.entrypoint : "-"}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>CMD</p>
                <p>{specifications.cmd ? specifications.cmd : "-"}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Volumes</p>
                <p>{specifications.volumes ? specifications.volumes : "-"}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Working directory</p>
                <p>{specifications.workingDirectory ? specifications.workingDirectory : "-"}</p>
            </div>
            <div className="grid grid-cols-[1fr_4fr]">
                <p>Stop signal</p>
                <p>{specifications.stopSignal ? specifications.stopSignal : "-"}</p>
            </div>
            <div className="flex flex-col">
                <p>Raw configuration</p>
                <div className="relative bg-[#242424] border border-[#363636] rounded p-4 mt-2">
                    <pre className="text-sm text-[#80A6B8] font-mono whitespace-pre-wrap mb-0">{rawConfiguration}</pre>
                    <button
                        className="absolute top-2 right-2 p-1 hover:bg-[#363636] rounded cursor-pointer"
                        title="Copy"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <span className="text-[#FAFAFA] text-xs">Copied!</span>
                        ) : (
                            <Copy size={16} className="text-[#FAFAFA]" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecificationTabContent;
