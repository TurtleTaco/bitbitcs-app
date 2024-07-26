"use client";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Client as Styletron } from "styletron-engine-monolithic";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "./styletron";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>{children}</BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
