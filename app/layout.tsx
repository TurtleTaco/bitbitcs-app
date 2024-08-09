import React from "react";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import BottomNav from "./ui/bottom-nav";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="mx-auto w-screen h-screen flex flex-col shadow-lg rounded-xl overflow-hidden">
            <main className="flex-1 overflow-y-auto flex flex-col">
              {children}
            </main>
            <div className="flex-shrink-0">
              <BottomNav />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
