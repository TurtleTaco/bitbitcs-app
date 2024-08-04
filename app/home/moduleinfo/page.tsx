"use client";

import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { styled } from "baseui";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { handleBackNavigation } from "app/lib/navigation";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ProgressBar } from "baseui/progress-bar";
import { Tag, KIND as TAGKIND } from "baseui/tag";
import { Theme } from "baseui/theme";
import { StyleObject } from "styletron-react";
import { withAuth } from "app/hoc/withAuth";

interface Subtopic {
  title: string;
  completed: boolean;
}

interface DP {
  dp_title: string;
  difficulty: string;
  subtopics: Subtopic[];
}

interface Chapter {
  chapter_title: string;
  dps: DP[];
}

interface ModuleInfo {
  module_title: string;
  icon: React.ComponentType;
  chapters: Chapter[];
}

const module_info: ModuleInfo = {
  module_title: "Advanced Indexing Strategies",
  icon: RiShieldKeyholeLine,
  chapters: [
    {
      chapter_title: "Introduction to Indexing",
      dps: [
        {
          dp_title: "Basic Indexing Concepts",
          difficulty: "Intro",
          subtopics: [
            { title: "What is an Index?", completed: true },
            { title: "Types of Indexes", completed: true },
            { title: "When to Use Indexes", completed: true },
          ],
        },
        {
          dp_title: "Index Data Structures",
          difficulty: "Intro",
          subtopics: [
            { title: "Hash-based Indexes", completed: false },
            { title: "Tree-based Indexes", completed: true },
          ],
        },
      ],
    },
    {
      chapter_title: "Indexing with B-trees",
      dps: [
        {
          dp_title: "Understanding the Basic Structure of B-trees",
          difficulty: "Medium",
          subtopics: [
            { title: "Node Structure and Tree Organization", completed: true },
            {
              title: "Performance and Efficiency Considerations",
              completed: false,
            },
            { title: "Operational Complexity and Analysis", completed: false },
          ],
        },
        {
          dp_title: "How B-trees Manage Data Insertion and Deletion",
          difficulty: "Advanced",
          subtopics: [
            {
              title: "B-tree Structure and Node Splitting Dynamics",
              completed: false,
            },
            {
              title: "Deletion Operations and B-tree Property Maintenance",
              completed: false,
            },
            {
              title: "Theoretical Performance Bounds of B-tree Operations",
              completed: false,
            },
          ],
        },
      ],
    },
  ],
};

const HomeContainer = styled("div", {
  padding: "10px",
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
      // ':hover': {
      //   textDecoration: 'underline',
      // },
      display: "inline-flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    } as StyleObject;
  }
);

function Page() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const [completionPercent, setCompletionPercent] = React.useState<number[]>([
    60,
  ]);

  // Find the index of the first uncompleted subtopic
  const findFirstUncompletedSubtopic = (chapter: Chapter): number => {
    for (let dpIndex = 0; dpIndex < chapter.dps.length; dpIndex++) {
      const dp = chapter.dps[dpIndex];
      if (dp.subtopics.some((subtopic) => !subtopic.completed)) {
        return dpIndex;
      }
    }
    // If all subtopics are completed, return the last DP index
    return chapter.dps.length - 1;
  };

  const findFirstUncompletedSubtopicIndex = (dp: DP): number => {
    return dp.subtopics.findIndex((subtopic) => !subtopic.completed);
  };

  // Calculate completion percentage
  React.useEffect(() => {
    const totalSubtopics = module_info.chapters.reduce(
      (acc, chapter) =>
        acc + chapter.dps.reduce((acc, dp) => acc + dp.subtopics.length, 0),
      0
    );
    const completedSubtopics = module_info.chapters.reduce(
      (acc, chapter) =>
        acc +
        chapter.dps.reduce(
          (acc, dp) =>
            acc + dp.subtopics.filter((subtopic) => subtopic.completed).length,
          0
        ),
      0
    );
    setCompletionPercent([
      Math.round((completedSubtopics / totalSubtopics) * 100),
    ]);
  }, []);

  return (
    <HomeContainer className="p-4">
      <ListHeading
        heading="Hello, Lin!"
        maxLines={1}
        endEnhancer={() => (
          <Button
            size={SIZE.compact}
            kind={KIND.secondary}
            onClick={() => handleBackNavigation(router, pathname)}
          >
            <MdKeyboardArrowLeft />
          </Button>
        )}
      />

      <ListItem
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => (
          <ProgressBar value={completionPercent[0]} showLabel />
        )}
      >
        <ListItemLabel description={`${module_info.chapters.length} Chapters`}>
          {module_info.module_title}
        </ListItemLabel>
      </ListItem>

      <div className="p-4">
        {module_info.chapters.map((chapter, chapterIndex) => (
          <React.Fragment key={`chapter-${chapterIndex}`}>
            <ChapterTitle>
              Chapter {chapterIndex + 1}: {chapter.chapter_title}
            </ChapterTitle>
            <div className="[&_ol_li::before]:content-none">
              <ProgressSteps
                current={findFirstUncompletedSubtopic(chapter)}
                alwaysShowDescription
              >
                {chapter.dps.map((dp, dpIndex) => (
                  <NumberedStep
                    key={`dp-${chapterIndex}-${dpIndex}`}
                    title={dp.dp_title}
                  >
                    {dp.subtopics.map((subtopic, subtopicIndex) => (
                      <p
                        key={`subtopic-${chapterIndex}-${dpIndex}-${subtopicIndex}`}
                      >
                        <SubtopicLink
                          $completed={subtopic.completed}
                          onClick={() =>
                            router.push(
                              `/learn?subtopic=${encodeURIComponent(
                                subtopic.title
                              )}`
                            )
                          }
                        >
                          <Tag
                            closeable={false}
                            kind={
                              subtopic.completed
                                ? TAGKIND.green
                                : TAGKIND.neutral
                            }
                          >
                            {subtopic.completed ? "Aced" : "Todo"}
                          </Tag>
                          {subtopic.title}
                        </SubtopicLink>
                      </p>
                    ))}
                    {findFirstUncompletedSubtopicIndex(dp) === -1 ? null : (
                      <Button
                        size="compact"
                        onClick={() =>
                          router.push(
                            `/learn?topic=${encodeURIComponent(dp.dp_title)}`
                          )
                        }
                      >
                        Start Learning
                      </Button>
                    )}
                  </NumberedStep>
                ))}
              </ProgressSteps>
            </div>
          </React.Fragment>
        ))}
      </div>
    </HomeContainer>
  );
}

export default withAuth(Page);