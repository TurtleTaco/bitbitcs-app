"use client";

import React from "react";
import { TreeView, TreeNodeData, toggleIsExpanded } from "baseui/tree-view";
import { useParams, usePathname, useRouter } from "next/navigation";
import { styled } from "baseui";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { handleBackNavigation } from "app/lib/navigation";
import { start } from "repl";

const module_info = {
  module_title: "Advanced Indexing Strategies",
  chapters: [
    {
      chapter_title: "Indexing with B-trees",
      dps: [
        {
          dp_title: "Understanding the Basic Structure of B-trees",
          subtopics: [
            "Node Structure and Tree Organization",
            "Performance and Efficiency Considerations",
            "Operational Complexity and Analysis",
          ],
        },
        {
          dp_title: "How B-trees Manage Data Insertion and Deletion",
          subtopics: [
            "B-tree Structure and Node Splitting Dynamics",
            "Deletion Operations and B-tree Property Maintenance",
            "Theoretical Performance Bounds of B-tree Operations",
          ],
        },
        {
          dp_title:
            "B-tree Balancing Techniques: Ensuring Efficient Data Access",
          subtopics: [
            "Foundational Principles of B-tree Balancing",
            "Key Operations for Maintaining B-tree Structure",
            "Advanced Analysis of B-tree Performance",
          ],
        },
        {
          dp_title: "Exploring B-tree Variants and Their Specific Uses",
          subtopics: [
            "Optimizing B-tree Structures for Memory Hierarchy",
            "Data Organization and Processing in B-tree Variants",
          ],
        },
      ],
    },
    {
      chapter_title: "Hash Indexes Usage",
      dps: [
        {
          dp_title: "Core Principles of Hash Indexes",
          subtopics: [
            "Fundamental Structure and Function of Hash Indexes",
            "Optimizing Hash Index Organization",
            "Performance Characteristics and Limitations",
            "Comparing Indexing Approaches",
          ],
        },
        {
          dp_title: "Designing Hash Functions for Optimal Performance",
          subtopics: [
            "Mathematical Foundations of Hash Function Design",
            "Practical Implementation of Hash Functions",
          ],
        },
        {
          dp_title:
            "Collision Handling in Hash Indexes: Techniques and Trade-offs",
          subtopics: [
            "Collision Resolution Fundamentals",
            "Statistical Performance and Complexity Analysis",
            "Low-Level Performance and Theoretical Limits",
          ],
        },
        {
          dp_title:
            "Comparative Analysis: When to Use Hash Indexes Over Other Index Types",
          subtopics: [
            "Hash Index Fundamentals and Performance",
            "Hash Index Limitations and Trade-offs",
            "Comparative Data Structures: Hash vs. B-tree",
          ],
        },
        {
          dp_title:
            "Real-world Applications of Hash Indexes in Database Systems",
          subtopics: [
            "Optimizing In-Memory Hash Indexes for High-Performance Databases",
            "Scaling Hash Indexes in Distributed Systems",
            "Hash Indexes in NoSQL and Multi-Column Query Environments",
          ],
        },
      ],
    },
    {
      chapter_title: "Full-Text Indexing Techniques",
      dps: [
        {
          dp_title: "Fundamentals of Full-Text Indexing",
          subtopics: [
            "Foundations of Full-Text Indexing Structures",
            "Lexical Analysis and Semantic Challenges",
            "Optimization Principles in Full-Text Indexing",
            "Expanding Full-Text Indexing Beyond Text",
          ],
        },
        {
          dp_title: "Tokenization and Text Analysis in Full-Text Indexing",
          subtopics: [
            "Linguistic Foundations of Text Analysis",
            "Advanced Tokenization Techniques",
            "Challenges in Non-Alphabetic and Complex Morphological Languages",
            "Technical Considerations in Multilingual Indexing",
          ],
        },
        {
          dp_title: "Indexing Structures Used in Full-Text Search",
          subtopics: [
            "Tree-Based Indexing Structures for Efficient Text Search",
            "Advanced Indexing Techniques for Full-Text Search",
            "Scalability and Performance of Indexing Structures",
            "Adapting Indexing Structures for Diverse Environments",
          ],
        },
        {
          dp_title: "Optimizing Full-Text Indexes for Performance",
          subtopics: [
            "Information Theory and Compression in Full-Text Indexing",
            "Scalability and Parallelism in Distributed Indexing Systems",
            "Consistency and Logging in Dynamic Indexing Environments",
            "Advanced Caching Strategies for Index Optimization",
          ],
        },
        {
          dp_title: "Advanced Search Features Enabled by Full-Text Indexes",
          subtopics: [
            "Foundations of Full-Text Search Algorithms",
            "Advanced Relevance Ranking and Information Theory",
            "Query Performance and Index Optimization",
          ],
        },
      ],
    },
    {
      chapter_title: "Indexing in Distributed Databases",
      dps: [
        {
          dp_title: "Key Challenges in Indexing for Distributed Databases",
          subtopics: [
            "Distributed Data Partitioning and Index Architecture",
            "Network Topology and Distributed Index Management",
            "Consistency Models and CAP Theorem in Distributed Indexing",
            "Fault Tolerance and Index Recovery in Distributed Systems",
          ],
        },
        {
          dp_title: "Strategies for Consistent Indexing Across Nodes",
          subtopics: [
            "Distributed Hash Tables and Commit Protocols",
            "Quorum-based Consensus and Conflict Resolution",
            "Integration and Fault Tolerance in Distributed Indexing",
            "Bridging Distributed and Traditional Database Concepts",
          ],
        },
        {
          dp_title:
            "Performance Optimization Techniques for Distributed Indexes",
          subtopics: [
            "Probabilistic Data Structures in Distributed Indexing",
            "Caching and Adaptive Indexing Strategies",
            "Resource Management in Parallel Index Operations",
            "Resilience and Failure Recovery in Optimized Distributed Indexes",
          ],
        },
        {
          dp_title: "Future Trends in Distributed Database Indexing",
          subtopics: [
            "Adaptive Index Management with Machine Learning",
            "Architectural Considerations for Self-Tuning Indexes",
            "Quantum-Resistant Cryptography in Distributed Indexing",
            "Edge Computing and Distributed Index Management",
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
});

interface ModuleInfo {
  module_title: string;
  chapters: {
    chapter_title: string;
    dps: {
      dp_title: string;
      subtopics: string[];
    }[];
  }[];
}

const customLabel = (node: TreeNodeData) => {
  return (
    <Label>
      <span>{node.title}</span>
    </Label>
  );
};

const createTreeData = (moduleInfo: ModuleInfo): TreeNodeData[] => {
  return [
    {
      id: "module",
      label: customLabel,
      isExpanded: true,
      title: moduleInfo.module_title,
      children: moduleInfo.chapters.map((chapter, chapterIndex) => ({
        id: `chapter-${chapterIndex}`,
        label: customLabel,
        isExpanded: true,
        title: chapter.chapter_title,
        children: chapter.dps.map((dp, dpIndex) => ({
          id: `dp-${chapterIndex}-${dpIndex}`,
          label: customLabel,
          isExpanded: false,
          title: dp.dp_title,
          children: dp.subtopics.map((subtopic, subtopicIndex) => ({
            id: `subtopic-${chapterIndex}-${dpIndex}-${subtopicIndex}`,
            label: customLabel,
            title: subtopic,
          })),
        })),
      })),
    },
  ];
};

export default function Page() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const moduleId = parseInt(params.moduleId as string, 10);

  const [treeData, setTreeData] = React.useState<TreeNodeData[]>(
    createTreeData(module_info)
  );

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
        subHeading="3 Modules to go!"
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

      <div className="p-2">
        <TreeView data={treeData} getId={getId} onToggle={handleToggle} />
      </div>
    </HomeContainer>
  );
}
