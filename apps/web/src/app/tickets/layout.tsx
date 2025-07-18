import TicketsContent from "@/components/sections/tickets/tickets-content";

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full w-full">
            <TicketsContent />
            <div className="flex h-full">{children}</div>
        </div>
    );
} 