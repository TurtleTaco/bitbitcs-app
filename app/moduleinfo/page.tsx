"use client";

import React, { useState, useEffect } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { styled } from "baseui";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ProgressBar } from "baseui/progress-bar";
import { Tag, KIND as TAGKIND } from "baseui/tag";
import { Theme } from "baseui/theme";
import { StyleObject } from "styletron-react";
import { FieldModule as ModuleInfoType, Chapter } from "app/utils/api";
import { withAuth } from "app/hoc/withAuth";
import { SegmentedControl, Segment } from "baseui/segmented-control";
import { MobileHeader } from "baseui/mobile-header";
import { ArrowLeft, Plus, Check } from "baseui/icon";
import { MdOutlineAddTask } from "react-icons/md";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE as MODAL_SIZE,
  ROLE,
} from "baseui/modal";
import { Checkbox } from "baseui/checkbox";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { StyledLink } from "baseui/link";
import { useCourseOutline } from "app/utils/api";

const HomeContainer = styled("div", {
  padding: "20px",
});

const ChapterTitle = styled("h2", {
  fontSize: "1.5rem",
  marginTop: "2rem",
  marginBottom: "1rem",
});

interface SubtopicLinkProps {
  $completed: boolean;
}

const SubtopicLink = styled<"a", SubtopicLinkProps>(
  "a",
  ({ $theme, $completed }: SubtopicLinkProps & { $theme: Theme }) => {
    return {
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    } as StyleObject;
  }
);

// interface ModuleInfoProps {
//   fieldName: string;
//   moduleName: string;
//   // if not moduleView its milestone view
//   moduleView: boolean;
//   // onBack: () => void;
// }

function Page() {
  const router = useRouter();
  const [css, theme] = useStyletron();

  const searchParams = useSearchParams();
  const fieldName = searchParams.get("field_name") || "";
  const moduleName = searchParams.get("module_name") || "";
  const moduleView = searchParams.get("module_view") === "true";

  const { data: courseOutline, isLoading, error } = useCourseOutline();

  const [completionPercent, setCompletionPercent] = useState<number>(0);
  const [activeChapter, setActiveChapter] = useState<string>("0");
  const [selectedChapters, setSelectedChapters] = useState<boolean[]>([]);

  const findModuleInfo = () => {
    if (!courseOutline) return null;
    const field = courseOutline.course_outline.fields.find(
      (f) => f.title === fieldName
    );
    if (!field) return null;
    return field.modules.find((m) => m.title === moduleName);
  };

  const moduleInfo = findModuleInfo();

  useEffect(() => {
    if (moduleInfo) {
      const totalSubtopics = moduleInfo.chapters.reduce(
        (acc, chapter) =>
          acc +
          chapter.discussion_points.reduce(
            (acc, dp) => acc + dp.subtopic_titles.length,
            0
          ),
        0
      );
      setCompletionPercent(0);
      setSelectedChapters(new Array(moduleInfo.chapters.length).fill(false));
    }
  }, [moduleInfo]);

  // TODO: use some progress bar
  if (isLoading) return <div></div>;
  if (error) return <div></div>;
  if (!moduleInfo) return <div></div>;

  const allChecked = selectedChapters.every(Boolean);
  const isIndeterminate = selectedChapters.some(Boolean) && !allChecked;

  const renderChapterContent = (
    fieldName: string,
    moduleTitle: string,
    chapter: Chapter,
    chapterIndex: number
  ) => (
    <div key={`chapter-${chapterIndex}`}>
      <ChapterTitle style={{ marginTop: "2rem" }}>
        Chapter {chapterIndex + 1}:{" "}
        {!moduleView && (
          <Tag closeable={false} kind={TAGKIND.positive}>
            View Course
          </Tag>
        )}
        <br />
        {chapter.title}
      </ChapterTitle>
      <div className="[&_ol_li::before]:content-none">
        <ProgressSteps current={0} alwaysShowDescription>
          {chapter.discussion_points.map((dp, dpIndex) => (
            <NumberedStep
              key={`dp-${chapterIndex}-${dpIndex}`}
              title={dp.title}
            >
              {dp.subtopic_titles.map((subtopic, subtopicIndex) => (
                <p key={`subtopic-${chapterIndex}-${dpIndex}-${subtopicIndex}`}>
                  <SubtopicLink
                    $completed={false}
                    onClick={() =>
                      router.push(
                        `/learn?dp_title=${encodeURIComponent(
                          dp.title
                        )}&subtopic_title=${encodeURIComponent(subtopic)}`
                      )
                    }
                  >
                    <Tag closeable={false} kind={TAGKIND.neutral}>
                      Todo
                    </Tag>
                    {subtopic}
                  </SubtopicLink>
                </p>
              ))}
              <Button
                size="compact"
                onClick={() =>
                  router.push(
                    `/learn?dp_title=${encodeURIComponent(
                      dp.title
                    )}&subtopic_title=${encodeURIComponent(
                      dp.subtopic_titles[0]
                    )}`
                  )
                }
              >
                Start Learning
              </Button>
            </NumberedStep>
          ))}
        </ProgressSteps>
      </div>
    </div>
  );

  return (
    <HomeContainer className="p-4">
      <MobileHeader
        title="Course Outline"
        navButton={{
          renderIcon: ArrowLeft,
          onClick: () => router.back(),
          label: "Go back to the previous screen",
        }}
      />

      <div style={{ padding: "0px" }}>
        <ListItem
          artworkSize={ARTWORK_SIZES.MEDIUM}
          endEnhancer={() => (
            <ProgressBar value={completionPercent} showLabel />
          )}
        >
          <ListItemLabel description={`${moduleInfo.chapters.length} Chapters`}>
            {moduleInfo.title}
          </ListItemLabel>
        </ListItem>
      </div>

      <div className="p-4">
        <SegmentedControl
          activeKey={activeChapter}
          onChange={({ activeKey }) => {
            setActiveChapter(String(activeKey));
          }}
          overrides={{
            Root: {
              style: {
                width: "100%",
              },
            },
          }}
        >
          {moduleInfo.chapters.map((chapter, index) => (
            <Segment key={index} label={`${index + 1}`} />
          ))}
        </SegmentedControl>
        {renderChapterContent(
          fieldName,
          moduleInfo.title,
          moduleInfo.chapters[parseInt(activeChapter)],
          parseInt(activeChapter)
        )}
      </div>
    </HomeContainer>
  );
}

export default withAuth(Page);
