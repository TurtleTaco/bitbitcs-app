"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styletron-react";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ProgressBar } from "baseui/progress-bar";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import styles from "app/ui/html_content.module.css";

const LearnContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    async function fetchHtml() {
      try {
        const response = await fetch(
          "/course/1_Performance and Efficiency Considerations.md.html"
        );
        const html = await response.text();
        const snippets = html.split("<hr>");
        snippets.shift();

        setHtmlContent(snippets as any);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    }

    fetchHtml();
  }, []);

  const handleNext = () => {
    if (currentSnippet < htmlContent.length - 1) {
      setStepProgress(((currentSnippet + 1) / htmlContent.length) * 100);
      setCurrentSnippet(currentSnippet + 1);
      triggerFireworks();
    }
  };

  const handlePrevious = () => {
    if (currentSnippet > 0) {
      setStepProgress(((currentSnippet - 1) / htmlContent.length) * 100);
      setCurrentSnippet(currentSnippet - 1);
    }
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 1000);
  };

  return (
    <LearnContainer className="p-4">
      <ListHeading
        heading="Advanced Indexing Strategies"
        subHeading="Theoretical Performance Bounds of B-tree Operations"
        maxLines={2}
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
      <div className="pl-2 pr-2" style={{ marginBottom: "20px" }}>
        <ProgressBar value={stepProgress} steps={htmlContent.length} />
      </div>
      <div
        className={`pl-5 pr-5 ${styles.htmlContentWrapper}`}
        dangerouslySetInnerHTML={{ __html: htmlContent[currentSnippet] || "" }}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {currentSnippet > 0 && (
          <Button
            onClick={handlePrevious}
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: { width: "116px", marginRight: "20px" },
              },
            }}
          >
            Previous
          </Button>
        )}
        {currentSnippet < htmlContent.length - 1 && (
          <Button
            onClick={handleNext}
            size={SIZE.compact}
            overrides={{ BaseButton: { style: { width: "116px" } } }}
          >
            Continue
          </Button>
        )}
        {currentSnippet == htmlContent.length - 1 && (
          <Button
            onClick={triggerFireworks}
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: {
                  width: "116px",
                  backgroundColor: "#166c3b",
                  color: "white",
                },
              },
            }}
          >
            Complete
          </Button>
        )}
        {showFireworks && <Fireworks autorun={{ speed: 1 }} />}
      </div>
    </LearnContainer>
  );
}