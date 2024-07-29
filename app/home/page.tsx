"use client";

import { UrlObject } from "url";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Avatar } from "baseui/avatar";

import * as React from "react";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { MdKeyboardArrowLeft, MdOutlineDiamond } from "react-icons/md";
import { styled } from "styletron-react";
import { StyledDivider } from "baseui/divider";
import { StarRating } from "baseui/rating";
import { Tile, TILE_KIND, ALIGNMENT, StyledParagraph } from "baseui/tile";
import { Search, ChevronRight } from "baseui/icon";
import {
  RiShieldKeyholeLine,
  RiDatabase2Line,
  RiFlowChart,
  RiLockLine,
  RiAlarmWarningLine,
  RiPercentLine,
  RiSearchLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Select } from "baseui/select";
import { handleBackNavigation } from "app/lib/navigation";
import { FaBoltLightning } from "react-icons/fa6";

const HomeContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [value, setValue] = React.useState(4);

  const [css] = useStyletron();
  const pathname = usePathname();

  const selectOverride = css({
    "ul li::before": {
      content: "none !important",
    },
  });

  const iconColors = [
    "#166c3b", // Green
    "#276ef1", // Blue
    "#9747FF", // Purple
    "#7356BF", // Indigo
    "#EA6B16", // Orange
    "#E11900", // Red
    "#1E54B7", // Dark Blue
    "#5F6B7C", // Gray
    "#05944F", // Bright Green
    "#C63A38", // Dark Red
    "#F4C61F", // Yellow
    "#2089B5", // Teal
    "#A872B9", // Lavender
    "#FF6154", // Coral
    "#454545", // Charcoal
  ];

  interface Module {
    id: number;
    title: string;
    chapter_cnt: number;
    chapters: string[];
    icon: React.ComponentType<{ size: number; style: React.CSSProperties }>;
  }

  const modules: Module[] = [
    {
      id: 1,
      title: "Advanced Indexing Strategies",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiShieldKeyholeLine,
    },
    {
      id: 2,
      title: "Big Data Handling",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiDatabase2Line,
    },
    {
      id: 3,
      title: "Data Modeling",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiFlowChart,
    },
    {
      id: 4,
      title: "Network Security",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiLockLine,
    },
    {
      id: 5,
      title: "Logging, Monitoring, and Alerting Systems",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiAlarmWarningLine,
    },
    {
      id: 6,
      title: "Probability Theory",
      chapter_cnt: 4,
      chapters: [
        "Indexing with B-trees",
        "Hash Indexes Usage",
        "Full-Text Indexing Techniques",
        "Indexing in Distributed Databases",
      ],
      icon: RiPercentLine,
    },
  ];

  // Define the type for our daily check-in data
  type DailyCheckIn = {
    day: string;
    checkedIn: boolean;
  };

  // Hard-coded list of daily check-ins
  const dailyCheckIns: DailyCheckIn[] = [
    { day: "Mon", checkedIn: true },
    { day: "Tue", checkedIn: false },
    { day: "Wed", checkedIn: true },
    { day: "Thu", checkedIn: true },
    { day: "Fri", checkedIn: false },
    { day: "Sat", checkedIn: false },
    { day: "Sun", checkedIn: false },
  ];

  // Study paths
  const studyPaths = [
    {
      label: "Backend Study Path",
      id: "#F0F8FF",
    },
    {
      label: "Frontend Study Path",
      id: "#FAEBD7",
    },
    {
      label: "System design interview",
      id: "#00FFFF",
    },
  ];

  const [studyPath, setStudyPath] = React.useState([studyPaths[0]]);

  // In your component
  const handleTileClick = (moduleId: number) => {
    router.push(`/home/${moduleId}`);
  };

  // First, let's define a simple hash function
  const hashString = (str: String) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  return (
    <HomeContainer className="p-4">
      <ListHeading
        heading="Hello, Lin!"
        subHeading="3 Modules to go!"
        maxLines={1}
        endEnhancer={() => (
          // <StarRating
          //   numItems={5}
          //   onChange={(data) => setValue(data.value)}
          //   size={22}
          //   value={value}
          // />
          <Button
            size={SIZE.compact}
            kind={KIND.secondary}
            // onClick={() => handleBackNavigation(router, pathname)}
          >
            <MdOutlineDiamond style={{ color: "#F4C61F" }} />
          </Button>
        )}
      />

      <div className="pl-3 pr-3">
        <StyledDivider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {dailyCheckIns.map((checkIn, index) => (
            <div key={index} style={{ flex: "1", textAlign: "center" }}>
              <Button
                size={SIZE.compact}
                kind={checkIn.checkedIn ? KIND.primary : KIND.secondary}
                overrides={{
                  BaseButton: {
                    style: {
                      pointerEvents: "none", // Makes the button non-clickable
                    },
                  },
                }}
              >
                <FaBoltLightning style={{ color: "#F4C61F" }} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ListHeading
        heading="Pick up where you left off"
        // subHeading="3 Modules to go!"
        maxLines={1}
      />

      <div className="p-3">
        <div className={selectOverride}>
          <Select
            clearable={false}
            options={studyPaths || []}
            value={studyPath || []}
            placeholder="Select Study Path"
            onChange={(params) => setStudyPath(params.value as any)}
            searchable={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-3">
        {modules.map((module) => {
          const colorIndex = hashString(module.title) % iconColors.length;

          return (
            <Tile
              key={module.id}
              label={module.title}
              leadingContent={() => (
                <module.icon
                  size={36}
                  style={{ color: iconColors[colorIndex] }}
                />
              )}
              trailingContent={() => <ChevronRight size={36} />}
              headerAlignment={ALIGNMENT.left}
              bodyAlignment={ALIGNMENT.left}
              onClick={() => handleTileClick(module.id)}
              tileKind={TILE_KIND.action}
              overrides={{
                Label: {
                  style: {
                    textAlign: "left",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxWidth: "15ch",
                    lineHeight: "1.2em",
                    height: "2.4em",
                    minHeight: "2.4em",
                  },
                },
              }}
            >
              <StyledParagraph>{module.chapter_cnt} chapters</StyledParagraph>
            </Tile>
          );
        })}
      </div>
    </HomeContainer>
  );
}
