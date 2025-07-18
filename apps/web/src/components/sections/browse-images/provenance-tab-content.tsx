"use client";


import { ProvenanceData } from "./mockdata";
import { Copy } from "lucide-react";
import { useState } from "react";

interface ProvenanceTabContentProps {
    provenance: ProvenanceData;
}

const ProvenanceTabContent = ({ provenance }: ProvenanceTabContentProps) => {
    const [copied, setCopied] = useState(false);
    const starterCommand = provenance.starterImages.join("\n");
    return (
        <div className="space-y-6">
            <div className="text-[#FAFAFA] opacity-80 text-sm whitespace-pre-line">
                {provenance.description}
            </div>
            <div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">{provenance.registryInfo}</h3>
                <div className="text-[#FAFAFA] opacity-80 text-sm mb-2">
                    Attestations are provided per image build, so you'll need to specify the correct tag and registry when pulling attestations from an image with cosign.
                </div>
                <ul className="list-disc pl-6 text-sm text-[#FAFAFA] opacity-80 mb-2">
                    {provenance.registryTags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-[#FAFAFA] mb-1">Starter Images</h4>
                <div className="relative bg-[#242424] border border-[#363636] rounded p-4 mt-2">
                    <pre className="text-sm text-[#80A6B8] font-mono whitespace-pre-wrap mb-0">{starterCommand}</pre>
                    <button
                        className="absolute top-2 right-2 p-1 hover:bg-[#363636] rounded cursor-pointer"
                        title="Copy"
                        onClick={() => {
                            navigator.clipboard.writeText(starterCommand);
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
        </div>
    );
};

export default ProvenanceTabContent; 