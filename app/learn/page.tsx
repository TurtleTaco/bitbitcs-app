"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styletron-react";
import { ListHeading } from "baseui/list";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";

const LearnContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    async function fetchHtml() {
      try {
        const response = await fetch(
          "/course/1_Performance and Efficiency Considerations.md.html"
        );
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    }

    fetchHtml();
  }, []);

  return (
    <LearnContainer className="p-4">
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
      <div className="p-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </LearnContainer>
  );
}
