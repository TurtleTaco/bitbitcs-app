"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "baseui/avatar";
import * as React from "react";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ListHeading } from "baseui/list";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND, SIZE } from "baseui/button";
import Link from "next/link";
import { useStyletron } from "baseui";
import { validate as validateEmail } from "email-validator";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { styled } from "styletron-react";
import { Search, ChevronRight } from "baseui/icon";
import { Tile, TILE_KIND, ALIGNMENT, StyledParagraph } from "baseui/tile";
import { MdKeyboardArrowLeft } from "react-icons/md";
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

const SearchContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedTiles, setSelectedTiles] = React.useState<number[]>([]);

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

  const modules = [
    {
      id: 1,
      title: "Application Security",
      chapter_cnt: 8,
      icon: RiShieldKeyholeLine,
    },
    {
      id: 2,
      title: "Big Data Handling",
      chapter_cnt: 4,
      icon: RiDatabase2Line,
    },
    { id: 3, title: "Data Modeling", chapter_cnt: 5, icon: RiFlowChart },
    { id: 4, title: "Network Security", chapter_cnt: 6, icon: RiLockLine },
    {
      id: 5,
      title: "Logging, Monitoring, and Alerting Systems",
      chapter_cnt: 6,
      icon: RiAlarmWarningLine,
    },
    { id: 6, title: "Probability Theory", chapter_cnt: 6, icon: RiPercentLine },
  ];

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

  const toggleTileSelection = (id: number) => {
    setSelectedTiles((prev) =>
      prev.includes(id) ? prev.filter((tileId) => tileId !== id) : [...prev, id]
    );
  };

  return (
    <SearchContainer className="p-4">
      <ListHeading
        heading="Course Finder"
        maxLines={1}
        endEnhancer={() => (
          <Button
            size={SIZE.compact}
            kind={KIND.secondary}
            onClick={() => router.back()}
          >
            <MdKeyboardArrowLeft />
          </Button>
        )}
      />
      <div className="p-3">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <Input
            inputRef={inputRef}
            placeholder="Course name"
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  maxWidth: "100%",
                  marginRight: 0,
                },
              },
            }}
            endEnhancer={<Search size="18px" title="" />}
          />
          <Button
            onClick={() => inputRef.current && inputRef.current.focus()}
            className="w-full sm:w-auto"
          >
            Find
          </Button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          {modules.map((module) => {
            const colorIndex = hashString(module.title) % iconColors.length;

            return (
              <div key={module.id} className="w-full">
                <Tile
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
                  onClick={() => toggleTileSelection(module.id)}
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
                        lineHeight: "1.2em",
                        height: "2.4em",
                        minHeight: "2.4em",
                      },
                    },
                    Root: {
                      style: {
                        width: "100%",
                        height: "100%",
                        outline: selectedTiles.includes(module.id)
                          ? `${theme.colors.black} solid`
                          : theme.colors.backgroundPrimary,
                      },
                    },
                  }}
                >
                  <StyledParagraph>
                    {module.chapter_cnt} chapters
                  </StyledParagraph>
                </Tile>
              </div>
            );
          })}
        </div>
      </div>
    </SearchContainer>
  );
}
