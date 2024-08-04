"use client";

import React from "react";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "@/app/styletron"; // Adjust this import path as needed

import BottomNav from "./ui/bottom-nav";
import { AuthProvider } from "./context/AuthContext";

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
            <AuthProvider>
              <div className="mx-auto w-screen h-screen flex flex-col shadow-lg rounded-xl overflow-hidden">
                <main className="flex-1 overflow-y-auto">{children}</main>
                <div className="flex-shrink-0">
                  <BottomNav />
                </div>
              </div>
            </AuthProvider>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}