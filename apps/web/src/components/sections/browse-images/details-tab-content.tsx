"use client";

import { ImageDetails } from "@/types/browse-images";
import { Copy } from "lucide-react";
import { useState } from "react";

interface DetailsTabContentProps {
    image: ImageDetails;
}

const DetailsTabContent = ({ image }: DetailsTabContentProps) => {
    const [copied, setCopied] = useState(false);
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">Prometheus Overview</h3>
                <p className="text-sm text-[#FAFAFA] opacity-80">{image.overview}</p>
            </div>
            <div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">Intended uses</h3>
                <ul className="list-disc pl-6 text-sm text-[#FAFAFA] opacity-80">
                    {image.intendedUses.map((use: string, i: number) => (
                        <li key={i}>{use}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">Use this with Clean Start</h3>
                <div className="flex items-center gap-2 bg-[#242424] rounded px-3 py-2 w-fit">
                    <span className="text-xs text-[#80A6B8] font-mono">{image.dockerPull}</span>
                    <button
                        className="ml-2 p-1 hover:bg-[#363636] rounded cursor-pointer"
                        title="Copy"
                        onClick={() => {
                            navigator.clipboard.writeText(image.dockerPull);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                        }}
                    >
                        {copied ? (
                            <span className="text-[#FAFAFA] text-xs">Copied!</span>
                        ) : (
                            <Copy size={16} className="text-[#FAFAFA]" />
                        )}
                    </button>
                </div>
            </div>
            <div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">Usage tips</h3>
                <ul className="list-disc pl-6 text-sm text-[#FAFAFA] opacity-80">
                    {image.usageTips.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DetailsTabContent; 