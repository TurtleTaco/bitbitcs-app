"use client";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Client as Styletron } from "styletron-engine-monolithic";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "./styletron";
import { styled } from "baseui";
import { usePathname } from "next/navigation";

// base setup
import { Button } from "baseui/button";
import { useStyletron } from "baseui";

// base bottom navigator
import * as React from "react";
import { BottomNavigation, NavItem } from "baseui/bottom-navigation";
import { MessageCard } from "baseui/message-card";
import { colors } from "baseui/tokens";
import Calendar from "baseui/icon/calendar";
import Show from "baseui/icon/show";
import Search from "baseui/icon/search";
import CircleCheckFilled from "baseui/icon/circle-check-filled";
import Menu from "baseui/icon/menu";

// UI components
import AccountManage from "@/app/ui/account/account-manage";

// Limit the development to be mobile viewports
const MobileContainer = styled("div", {
  maxWidth: "390px",
  margin: "0 auto",
  height: "100vh",
  overflowY: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
});

const BottomNavigationStyle = styled("div", {
  width: "100%",
  height: "100vh",
  border: "1px solid #ECECEC",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
});

const ContentArea = styled("div", {
  flex: 1,
  overflowY: "auto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState<number>(3);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <MobileContainer>
              <BottomNavigationStyle>
                <ContentArea>{children}</ContentArea>
                <BottomNavigation
                  activeKey={activeKey}
                  onChange={({ activeKey }) => setActiveKey(activeKey)}
                >
                  <NavItem title="Home" icon={Menu}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <MessageCard
                        heading="Heading"
                        paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
                        buttonLabel="Save now"
                        onClick={() => console.log("Saved")}
                        backgroundColor={colors.red200}
                      />
                      <MessageCard
                        paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
                        buttonLabel="Save now"
                        onClick={() => console.log("Saved")}
                      />
                      <MessageCard
                        heading="Heading"
                        paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
                        onClick={() => console.log("Saved")}
                        backgroundColor={colors.blue300}
                      />
                    </div>
                  </NavItem>

                  <NavItem title="Schedule" icon={Calendar}>
                    <h1>Schedule content</h1>
                  </NavItem>

                  <NavItem title="Search" icon={Search}>
                    <h1>Search content</h1>
                  </NavItem>

                  <NavItem title="Account" icon={CircleCheckFilled}>
                    <AccountManage />
                  </NavItem>
                </BottomNavigation>
              </BottomNavigationStyle>
            </MobileContainer>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
