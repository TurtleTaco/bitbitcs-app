"use client";

import React from "react";
import { TreeView, TreeNodeData, toggleIsExpanded } from "baseui/tree-view";
import { useParams, usePathname, useRouter } from "next/navigation";
import { styled } from "baseui";
import { useStyletron } from "baseui";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { handleBackNavigation } from "app/lib/navigation";
import { Slider } from "baseui/slider";
import Lottie from "lottie-react";
import fireAnimation from "public/fire_animation.json";
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
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ProgressBar } from "baseui/progress-bar";
import { Tag, KIND as TAGKIND } from "baseui/tag";

const module_info = {
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
            { title: "Hash-based Indexes", completed: true },
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

const Label = styled("div", {
  display: "flex",
  flexGrow: 1,
  paddingRight: "5px",
  alignItems: "center",
});

const CheckIcon = styled(FaCheckCircle, {
  marginLeft: "5px",
  flexShrink: 0,
  width: "16px",
  height: "16px",
});

interface ModuleInfo {
  module_title: string;
  chapters: {
    chapter_title: string;
    dps: {
      dp_title: string;
      difficulty: "Intro" | "Medium" | "Advanced";
      subtopics: { title: string; completed: boolean }[];
    }[];
  }[];
}

const customLabel = (node: TreeNodeData) => {
  return (
    <Label>
      <div style={{ color: node.completed ? "green" : "inherit" }}>
        {node.title}
      </div>
      {node.completed && <CheckIcon color="green" />}
    </Label>
  );
};

const createTreeData = (moduleInfo: ModuleInfo): TreeNodeData[] => {
  let firstUncompleted = true;

  return moduleInfo.chapters.map((chapter, chapterIndex) => {
    const chapterCompleted = chapter.dps.every((dp) =>
      dp.subtopics.every((subtopic) => subtopic.completed)
    );
    return {
      id: `chapter-${chapterIndex}`,
      label: customLabel,
      isExpanded: !chapterCompleted && firstUncompleted,
      title: chapter.chapter_title,
      completed: chapterCompleted,
      children: chapter.dps.map((dp, dpIndex) => {
        const dpCompleted = dp.subtopics.every(
          (subtopic) => subtopic.completed
        );
        const dpNode: TreeNodeData = {
          id: `dp-${chapterIndex}-${dpIndex}`,
          label: customLabel,
          isExpanded: !dpCompleted && firstUncompleted,
          title: dp.dp_title,
          completed: dpCompleted,
          difficulty: dp.difficulty, // Add this line
          children: dp.subtopics.map((subtopic, subtopicIndex) => {
            const subtopicNode: TreeNodeData = {
              id: `subtopic-${chapterIndex}-${dpIndex}-${subtopicIndex}`,
              label: customLabel,
              title: subtopic.title,
              completed: subtopic.completed,
            };
            if (firstUncompleted && !subtopic.completed) {
              firstUncompleted = false;
            }
            return subtopicNode;
          }),
        };
        return dpNode;
      }),
    };
  });
};

const LottieThumb: React.FC<{ $value: number[] }> = ({ $value }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "-20px",
        left: "-20px",
        // Remove absolute positioning
        transform: "translateX(20px)", // Center the thumb on the current value
      })}
    >
      <Lottie
        animationData={fireAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default function Page() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const [treeData, setTreeData] = React.useState<TreeNodeData[]>(
    createTreeData(module_info)
  );

  const [completionPercent, setCompletionPercent] = React.useState([60]);

  // calcualte completion percentage
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

  const getId = (node: TreeNodeData): string => node.id as string;

  const handleToggle = (node: TreeNodeData) => {
    if (!node.children || node.children.length === 0) {
      // This is a leaf node, navigate to the learn page
      router.push(`/learn?topic=${encodeURIComponent(node.title as string)}`);
    } else {
      // For non-leaf nodes, toggle expansion
      setTreeData((prevData) => toggleIsExpanded(prevData, node, getId));
    }
  };

  return (
    <HomeContainer className="p-4">
      <ListHeading
        heading="Hello, Lin!"
        // subHeading="3 Modules to go!"
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
        artwork={module_info.icon as any}
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => (
          <ProgressBar value={completionPercent[0]} showLabel />
        )}
      >
        <ListItemLabel description={`${module_info.chapters.length} Chapters`}>
          {module_info.module_title}
        </ListItemLabel>
      </ListItem>

      <div className="pl-3 pr-3 pt-3">
        <TreeView
          indentGuides
          data={treeData}
          getId={getId}
          onToggle={handleToggle}
        />
      </div>
    </HomeContainer>
  );
}
