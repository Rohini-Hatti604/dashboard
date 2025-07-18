import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import AdvisorySeverityContent from "./advisory-severity-content";
import AdvisoryPackageContent from "./advisory-package-content";
import { ICVE } from "../../../../../../packages/shared/src/entities/images/cve";

const TABS = [
    { key: "originPackages", label: "Origin Packages" },
    { key: "severity", label: "Severity" },
    { key: "references", label: "References" },
]

export default function AdvisoryTabSidesheet({
    advisory,
    onClose,
    open,

}: {
    advisory: ICVE;
    onClose: () => void;
    open: boolean;
}) {
    const [tab, setTab] = useState(TABS[0].key);

    const references = ["https://example.com/cve-2024-12345", "https://security.example.com/advisories/CVE-2024-12345", "https://nvd.nist.gov/vuln/detail/CVE-2024-12345", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12345"]
    return (
        <Sheet open={open} onOpenChange={(open) => { if (!open) onClose(); }}>
            <SheetContent side="right" className="!max-w-[700px] !w-[700px] p-4 flex flex-col h-full bg-[#181A1B]">
                <div className="flex flex-col h-full gap-3">
                    <SheetTitle>{advisory?.cveId}</SheetTitle>
                    <p className="text-muted-foreground">Description</p>
                    <p>Calling Verify with a VerifyOptions.KeyUsages that contains ExtKeyUsageAny unintentionally disabled policy validation.
                        This only affected certificate chains which contain policy graphs, which are rather uncommon.</p>
                    <p className="flex items-center text-[#039BE6] cursor-pointer"><span>Learn more about CVE-2025-0913</span><ArrowUpRight className="w-4 h-4" /></p>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[12px]">SEVERITY</p>
                            <div className={`priority-tag priority-${advisory?.severity?.toLowerCase()}`}>
                                <div className="priority-dot"></div>
                                <span>{advisory?.severity.charAt(0).toUpperCase() + advisory?.severity.slice(1)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[12px]">PUBLISHED</p>
                            <p>{advisory?.publishedAt?.toString()}</p>

                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[12px]">FIRST DETECTION</p>
                            <p>{advisory?.publishedAt?.toString()}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[12px]">LAST UPDATED</p>
                            <p>{advisory?.updatedAt?.toString()}</p>
                        </div>
                    </div>
                    <div className="border-b border-[#363636] flex flex-row items-center gap-6 px-8 pt-2 mb-0 -mx-4">
                        {TABS.map(t => (
                            <button
                                key={t.key}
                                className={`py-2 px-1 text-sm font-medium transition-colors cursor-pointer ${tab === t.key ? "text-[#039BE6] border-b-2 border-[#039BE6]" : "text-[#FAFAFA]"}`}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex-grow flex flex-col">
                        {tab === "originPackages" && (
                            <AdvisoryPackageContent />
                        )}
                        {tab === "severity" && (
                            <AdvisorySeverityContent advisory={advisory} />
                        )}
                        {tab === "references" && (
                            <div className="p-2">
                                {references.length > 0 ? (
                                    <ul className="list-disc  pl-5 space-y-2">
                                        {references.map((ref, index) => (
                                            <li key={index} className="marker-sky-blue">
                                                <a href={ref} className="text-[#80A6B8] hover:underline" target="_blank" rel="noopener noreferrer">
                                                    {ref}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No references available</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}