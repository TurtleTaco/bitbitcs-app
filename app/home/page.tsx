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
import { Alert } from "baseui/icon";
import { validate as validateEmail } from "email-validator"; // add this package to your repo: `$ pnpm add email-validator`
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { styled } from "styletron-react";
import { StyledDivider } from "baseui/divider";
import { EmoticonRating } from "baseui/rating";
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

const HomeContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [value, setValue] = React.useState(4);

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
            onClick={() => router.back()}
          >
            <MdKeyboardArrowLeft />
          </Button>
        )}
      />

      <div className="pl-3 pr-3">
        <StyledDivider />
      </div>
      <ListHeading
        heading="Pick up where you left off"
        // subHeading="3 Modules to go!"
        maxLines={1}
      />
      <div className="grid grid-cols-2 gap-4 p-3">
        {modules.map((module) => (
          <Tile
            key={module.id}
            label={module.title}
            leadingContent={() => <module.icon size={36} />}
            trailingContent={() => <ChevronRight size={36} />}
            headerAlignment={ALIGNMENT.left}
            bodyAlignment={ALIGNMENT.left}
            onClick={() => router.push(`/learn`)}
            tileKind={TILE_KIND.action} // Add this line
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
                  height: "2.4em", // Set a fixed height
                  minHeight: "2.4em", // Ensure minimum height
                },
              },
            }}
          >
            <StyledParagraph>{module.chapter_cnt} chapters</StyledParagraph>
          </Tile>
        ))}
      </div>
    </HomeContainer>
  );
}
