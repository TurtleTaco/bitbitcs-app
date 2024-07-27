"use client";

import React from "react";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "@/app/styletron"; // Adjust this import path as needed

import BottomNav from "./ui/bottom-nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <div className="mx-auto max-w-[390px] h-screen flex flex-col shadow-lg rounded-xl overflow-hidden">
              <main className="flex-1 overflow-y-auto">{children}</main>
              <div className="flex-shrink-0">
                <BottomNav />
              </div>
            </div>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}