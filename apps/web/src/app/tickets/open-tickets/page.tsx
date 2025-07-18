'use client';
import TicketsHeader from "@/components/sections/tickets/tickets.header";
import { DataTable } from "@/components/tables/table-component";
import useTicketsColumns from "@/components/tables/tickets/tickets.column";
import { sampleTickets } from "@/utils/mockdata";
import { useState } from "react";

export default function OpenTicketsPage() {
    const columns = useTicketsColumns();
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div className="flex flex-col h-full w-full">
            <TicketsHeader activeTab="open" selectedCount={0} />
            <div className="mx-3 flex-grow">
                <DataTable
                    isLoading={false}
                    data={sampleTickets}
                    columns={columns}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}