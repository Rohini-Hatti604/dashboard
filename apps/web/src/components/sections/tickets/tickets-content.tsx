'use client';

import HeaderTabs from "@/components/sections/tabs/header-tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CreateTicket from "../sidebar-sheet/new-ticket/create-ticket";
import { LayoutContext } from "@/components/providers/layout-provider";

export default function TicketsContent() {
  const [openTicketSheet, setOpenTicketSheet] = useState(false);
  const { setPlaceholder, buttonIcon, setButtonIcon } = useContext(LayoutContext)!;

  const tabs = [
    { key: "open", label: "Open Tickets", dropdown: false, href: "/tickets/open-tickets" },
    { key: "my", label: "My Tickets", dropdown: true, href: "/tickets/my-tickets", dropdownContent: 
      [
        { title: "Assigned to me" },
         { title: "Assigned to team" }] },
    {
      key: "closed", label: "Closed Tickets", dropdown: true, href: "/tickets/close-tickets", dropdownContent: [
        { title: "Today" },
        { title: "Yesterday" },
        { title: "This week", value: "1000" },
        { title: "This month", value: "14K" },
        { title: "This quarter", value: "1M" },
        { title: "This year" }
      ]
    },
  ];

  useEffect(() => {
    setPlaceholder("Search Tickets by subject, comment or number");
    if (buttonIcon) {
      setButtonIcon(false);
    }
  }, [setPlaceholder]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center border-b border-[#363636] h-[48px] px-3">
          <HeaderTabs tabs={tabs} />
          <Button
            className="bg-[#039BE6] text-[#FAFAFA] rounded px-5 h-[32px] flex items-center gap-1.5 cursor-pointer"
            style={{ background: "#039BE6" }}
            onClick={() => setOpenTicketSheet(true)}
          >
            <Plus />
            <p className="text-sm">New Ticket</p>
          </Button>
        </div>
      </div>
      <CreateTicket
        open={openTicketSheet}
        onOpenChange={setOpenTicketSheet}
      />
    </div>
  );
}
