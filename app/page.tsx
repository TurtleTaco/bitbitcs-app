"use client";

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

// base setup
import { Button } from "baseui/button";
import { useStyletron } from "baseui";

// base bottom navigator
import * as React from "react";
import { styled } from "baseui/styles";
import { BottomNavigation, NavItem } from "baseui/bottom-navigation";
import { MessageCard } from "baseui/message-card";
import { colors } from "baseui/tokens";
import Calendar from "baseui/icon/calendar";
import Show from "baseui/icon/show";
import Search from "baseui/icon/search";
import CircleCheckFilled from "baseui/icon/circle-check-filled";
import Menu from "baseui/icon/menu";

// react icon
import { FaHome } from "react-icons/fa";

// UI components
import AccountManage from "@/app/ui/account/account-manage";

const BottomNavigationStyle = styled("div", {
  width: "100%",
  height: "100vh",
  border: "1px solid #ECECEC",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
});

export default function Page() {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState<number>(3);

  return (
    <main className="flex flex-col">
      {/* <BottomNavigationStyle>
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
      </BottomNavigationStyle> */}

      {/* <div>
        <Button onClick={() => console.log("hey")}>Hello</Button>
        <p className={css({ color: theme.colors.accent600 })}>Styled by hook</p>
      </div> */}

      {/* <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div> */}
    </main>
  );
}
