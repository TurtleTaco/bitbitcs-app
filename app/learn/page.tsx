"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styletron-react";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ProgressBar } from "baseui/progress-bar";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import styles from "app/ui/html_content.module.css";
import { withAuth } from "app/hoc/withAuth";
import { useFetchSubtopicContent } from "app/utils/api";

const LearnContainer = styled("div", {
  padding: "10px",
});

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dp_title = searchParams.get("dp_title") || "";
  const subtopic_title = searchParams.get("subtopic_title") || "";

  console.log(dp_title);
  console.log(subtopic_title);

  const {
    data: htmlContent,
    isLoading,
    error,
  } = useFetchSubtopicContent(dp_title, subtopic_title);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);

  const snippets = htmlContent ? htmlContent.split("<hr>").slice(1) : [];

  useEffect(() => {
    if (snippets.length > 0) {
      setStepProgress((1 / snippets.length) * 100);
    }
  }, [snippets]);

  const handleNext = () => {
    if (currentSnippet < snippets.length - 1) {
      setStepProgress(((currentSnippet + 2) / snippets.length) * 100);
      setCurrentSnippet(currentSnippet + 1);
      triggerFireworks();
    }
  };

  const handlePrevious = () => {
    if (currentSnippet > 0) {
      setStepProgress((currentSnippet / snippets.length) * 100);
      setCurrentSnippet(currentSnippet - 1);
    }
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 1000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;

  return (
    <LearnContainer className="p-4">
      <ListHeading
        heading={dp_title}
        subHeading={subtopic_title}
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
        <ProgressBar value={stepProgress} steps={snippets.length} />
      </div>
      <div
        className={`pl-5 pr-5 ${styles.htmlContentWrapper}`}
        dangerouslySetInnerHTML={{ __html: snippets[currentSnippet] || "" }}
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
        {currentSnippet < snippets.length - 1 && (
          <Button
            onClick={handleNext}
            size={SIZE.compact}
            overrides={{ BaseButton: { style: { width: "116px" } } }}
          >
            Continue
          </Button>
        )}
        {currentSnippet == snippets.length - 1 && (
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

export default withAuth(Page);