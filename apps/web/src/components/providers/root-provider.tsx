'use client';

import { ConfigProvider } from "@/api/client";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { createQueryClient } from "@/queries/client";
import { IAppConfig } from "@/utils/config";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { LayoutProvider } from "./layout-provider";

interface ProvidersProps {
  children: ReactNode;
  config: IAppConfig;
}

export function RootProvider({ children, config }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider config={config}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
