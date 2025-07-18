import GaugeChart from "@/components/charts/gauge-chart";
import { AdvisoryTableRow } from "./mockdata";
import { ICVE } from "../../../../../../packages/shared/src/entities/images/cve";

export default function AdvisorySeverityContent({ advisory }: { advisory: ICVE }) {

    
    return (
        <div className="flex flex-col gap-2">
            <div className="w-full h-[220px] rounded-b-lg flex gap-3">
                <div className="flex-1 h-full border rounded overflow-hidden bg-[#1B1B1B] p-2">
                    <GaugeChart value={7.5} title="Severity Score" severity={advisory.severity} maxValue={10} />
                </div>
                <div className="flex-1 flex flex-col rounded justify-around border">
                    <div className="flex justify-between mx-6">
                        <span className="text-sm font-bold">Package</span>
                        <div className="text-sm">{advisory.packages?.[0]?.name || '-'}</div>
                    </div>
                    <div className="flex justify-between mx-6">
                        <span className="text-sm font-bold">Version</span>
                        <div className="text-sm">{advisory.packages?.[0]?.version || '-'}</div>
                    </div>
                    <div className="flex justify-between mx-6">
                        <span className="text-sm font-bold">Fixed version</span>
                        <div className="text-sm">{advisory?.fixedInVersion || '-'}</div>
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-sm font-bold mb-1">Description</h2>
                <p>{advisory?.description || "No description available"}</p>
            </div>
        </div>
    )
}