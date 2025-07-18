'use client';
import TicketsHeader from "@/components/sections/tickets/tickets.header";
import { useClosedTicketsColumns } from "@/components/tables/closed-tickets/closed-tickets.column";
import { DataTable } from "@/components/tables/table-component";
import { sampleClosedTickets } from "@/utils/mockdata";
import { useState } from "react";

export default function ClosedTicketsPage() {
    const columns = useClosedTicketsColumns();
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div className="flex flex-col h-full w-full">
            <TicketsHeader activeTab="closed" selectedCount={0} />
            <div className="mx-3 flex flex-col flex-grow">
            <DataTable
                isLoading={false}
                data={sampleClosedTickets}
                columns={columns}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
        </div>
    );
}