"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styletron-react";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ProgressBar } from "baseui/progress-bar";

const LearnContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    async function fetchHtml() {
      try {
        const response = await fetch(
          "/course/1_Performance and Efficiency Considerations.md.html"
        );
        const html = await response.text();
        const snippets = html.split("<hr>");
        // // before the first <hr> there are nothing, so we need to remove it
        snippets.shift();

        console.log(snippets);
        setHtmlContent(snippets as any);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    }

    fetchHtml();
  }, []);

  const handleNext = () => {
    if (currentSnippet < htmlContent.length - 1) {
      console.log(currentSnippet + 1);
      console.log(htmlContent.length);
      console.log(((currentSnippet + 1) / htmlContent.length) * 100 - 1);
      console.log("---------------");
      setStepProgress(((currentSnippet + 1) / htmlContent.length) * 100);
      setCurrentSnippet(currentSnippet + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSnippet > 0) {
      // console.log((currentSnippet - 1 / htmlContent.length) * 100);
      setStepProgress(((currentSnippet - 1) / htmlContent.length) * 100);
      setCurrentSnippet(currentSnippet - 1);
    }
  };

  // const progress = (currentSnippet / htmlContent.length) * 100;

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
        className="pl-5 pr-5"
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
            onClick={handleNext}
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
      </div>
    </LearnContainer>
  );
}