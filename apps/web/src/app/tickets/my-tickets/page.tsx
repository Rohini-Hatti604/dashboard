'use client';
import TicketsHeader from "@/components/sections/tickets/tickets.header";
import { DataTable } from "@/components/tables/table-component";
import { useTicketsColumns } from "@/components/tables/tickets/tickets.column";
import { sampleTickets } from "@/utils/mockdata";
import { useState } from "react";

export default function MyTicketsPage() {
    const columns = useTicketsColumns();
    const [currentPage, setCurrentPage] = useState(0);
    const myTicketsData = sampleTickets.filter(ticket => ticket.assignedTo === "Sarah Johnson");
    return (
        <div className="flex flex-col h-full w-full">
            <TicketsHeader activeTab="my" selectedCount={0} />
                    <div className="mx-3 flex flex-col flex-grow ">
            <DataTable
                isLoading={false}
                data={myTicketsData}
                columns={columns}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
        </div>
    );
}