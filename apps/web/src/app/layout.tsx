import Header from "@/components/layouts/headers/header";
import Sidebar from "@/components/layouts/sidebar/sidebar";
import { getConfig } from "@/utils/config";
import { Metadata } from "next";
import { ReactNode } from "react";
import { RootProvider } from "../components/providers/root-provider";
import "./global.css";


export const metadata: Metadata = {
  title: "Clean Start Dashboard",
  description: "A modern dashboard platform for building and managing images",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Get config on server side
  const config = getConfig();

  return (
    <html lang="en">
      <body className="antialiased">
        <RootProvider config={config}>
          <div className="flex w-full h-screen">
            {/* Sidebar  */}
            <div className="overflow-y-auto dark:bg-secondary-foreground w-[220px] border">
              <Sidebar />
            </div>
            <div className="w-0 flex-grow h-full flex flex-col border ">
              {/* Top Header */}
              <Header />
              <div className="flex-grow w-full h-0 overflow-auto">{children}</div>
            </div>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
