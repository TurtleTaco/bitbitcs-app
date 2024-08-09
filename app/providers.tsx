"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "@/app/styletron";
import { AuthProvider } from "./context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <AuthProvider>{children}</AuthProvider>
        </BaseProvider>
      </StyletronProvider>
    </QueryClientProvider>
  );
}
