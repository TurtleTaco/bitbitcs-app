"use client";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Client as Styletron } from "styletron-engine-monolithic";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "./styletron";
import { styled } from "baseui";

// Limit the development to be mobile viewports
const MobileContainer = styled("div", {
  maxWidth: "480px",
  margin: "0 auto",
  height: "100vh",
  overflowY: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <MobileContainer>{children}</MobileContainer>;
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
