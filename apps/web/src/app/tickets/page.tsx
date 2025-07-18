import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tickets - Clean Start Dashboard",
  description: "Manage and track tickets in your dashboard",
};

export default function TicketsPage() {
  redirect("/tickets/open-tickets");
}
