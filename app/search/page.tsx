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

const SearchContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedTiles, setSelectedTiles] = React.useState<number[]>([]);

  const modules = [
    { id: 1, title: "Application Security", chapter_cnt: 8 },
    { id: 2, title: "Big Data Handling", chapter_cnt: 4 },
    { id: 3, title: "Data Modeling", chapter_cnt: 5 },
    { id: 4, title: "Network Security", chapter_cnt: 6 },
    {
      id: 5,
      title: "Logging, Monitoring, and Alerting Systems",
      chapter_cnt: 6,
    },
    { id: 6, title: "Probability Theory", chapter_cnt: 6 },
    { id: 7, title: "Probability Theory", chapter_cnt: 6 },
    { id: 8, title: "Probability Theory", chapter_cnt: 6 },
  ];

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
      <div className="flex flex-col p-3 sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
      <div className="grid grid-cols-2 gap-4 p-3">
        {modules.map((module) => (
          <Tile
            key={module.id}
            tileKind={
              selectedTiles.includes(module.id)
                ? TILE_KIND.action
                : TILE_KIND.selection
            }
            label={module.title}
            leadingContent={() => <Search size={36} />}
            trailingContent={() => <ChevronRight size={36} />}
            headerAlignment={ALIGNMENT.left}
            bodyAlignment={ALIGNMENT.left}
            onClick={() => toggleTileSelection(module.id)}
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
              Root: {
                style: {
                  outline: selectedTiles.includes(module.id)
                    ? `${theme.colors.black} solid`
                    : theme.colors.backgroundPrimary,
                },
              },
            }}
          >
            <StyledParagraph>{module.chapter_cnt} chapters</StyledParagraph>
          </Tile>
        ))}
      </div>
    </SearchContainer>
  );
}
