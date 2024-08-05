"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import * as React from "react";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { MdKeyboardArrowLeft, MdOutlineDiamond } from "react-icons/md";
import { styled } from "styletron-react";
import { StyledDivider } from "baseui/divider";
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
} from "react-icons/ri";
import { Select } from "baseui/select";
import { handleBackNavigation } from "app/lib/navigation";
import { FaBoltLightning } from "react-icons/fa6";
import {
  fetchDailyCheckIns,
  fetchStudyPaths,
  fetchStudyPathModules,
  DailyCheckIn,
  Module,
  StudyPath,
} from "app/utils/api";
import { useAuth } from "app/context/AuthContext";
import { withAuth } from "app/hoc/withAuth";

const HomeContainer = styled("div", {
  padding: "10px",
});

function Page() {
  const router = useRouter();
  const [value, setValue] = React.useState(4);

  const [css] = useStyletron();
  const pathname = usePathname();

  const { user, loading, displayName, email, token } = useAuth();

  const selectOverride = css({
    "ul li::before": {
      content: "none !important",
    },
  });

  const iconColors = [
    "#166c3b", // Green
    "#276ef1", // Blue
    "#9747FF", // Purple
    "#7356BF", // Indigo
    "#EA6B16", // Orange
    "#E11900", // Red
    "#1E54B7", // Dark Blue
    "#5F6B7C", // Gray
    "#05944F", // Bright Green
    "#C63A38", // Dark Red
    "#F4C61F", // Yellow
    "#2089B5", // Teal
    "#A872B9", // Lavender
    "#FF6154", // Coral
    "#454545", // Charcoal
  ];

  const [dailyCheckIns, setDailyCheckIns] = React.useState<DailyCheckIn[]>([]);
  const [modules, setModules] = React.useState<Module[]>([]);
  const [studyPaths, setStudyPaths] = React.useState<StudyPath[]>([]);
  const [currentStudyPath, setCurrentStudyPath] = React.useState<
    [StudyPath] | []
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchModules = React.useCallback(async (studyPath: string) => {
    try {
      setIsLoading(true);
      const modulesData = await fetchStudyPathModules(studyPath);
      setModules(modulesData);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [checkIns, studyPathsData] = await Promise.all([
          fetchDailyCheckIns(),
          fetchStudyPaths(),
        ]);

        setDailyCheckIns(checkIns);
        setStudyPaths(studyPathsData);

        if (studyPathsData.length > 0) {
          const firstStudyPath = studyPathsData[0];
          setCurrentStudyPath([firstStudyPath]);
          await fetchModules(firstStudyPath.id); // Assuming StudyPath has an 'id' property
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchModules]);

  const handleSwitchStudyPath = async (studyPath: [StudyPath]) => {
    setCurrentStudyPath(studyPath);
    setIsLoading(true);
    console.log("Switching to study path:", studyPath);
    await fetchModules(studyPath[0].id);
    setIsLoading(false);
  };

  const handleTileClick = (moduleId: number) => {
    router.push(`/home/moduleinfo`);
  };

  // First, let's define a simple hash function
  const hashString = (str: String) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  return (
    <HomeContainer className="p-4">
      <ListHeading
        heading={`Hello, ${
          user?.displayName || user?.email?.split("@")[0] || ""
        }!`}
        subHeading="3 Modules to go!"
        maxLines={1}
        endEnhancer={() => (
          <Button
            size={SIZE.compact}
            kind={KIND.secondary}
            // onClick={() => handleBackNavigation(router, pathname)}
          >
            <MdOutlineDiamond style={{ color: "#F4C61F" }} />
          </Button>
        )}
      />

      <div className="pl-3 pr-3 pt-3">
        <StyledDivider />
        <div
          className="pt-6"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {dailyCheckIns.map((checkIn, index) => (
            <div key={index} style={{ flex: "1", textAlign: "center" }}>
              <Button
                size={SIZE.compact}
                kind={checkIn.checkedIn ? KIND.primary : KIND.secondary}
                overrides={{
                  BaseButton: {
                    style: {
                      pointerEvents: "none", // Makes the button non-clickable
                    },
                  },
                }}
              >
                <FaBoltLightning style={{ color: "#F4C61F" }} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ListHeading
        heading="Pick up where you left off"
        // subHeading="3 Modules to go!"
        maxLines={1}
      />

      <div className="p-3">
        <div className={selectOverride}>
          <Select
            clearable={false}
            options={studyPaths || []}
            value={currentStudyPath || []}
            placeholder="Select Study Path"
            onChange={(params) => handleSwitchStudyPath(params.value as any)}
            searchable={false}
            isLoading={isLoading}
            overrides={{
              Input: {
                props: {
                  readOnly: true,
                },
              },
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((module, index) => {
            const colorIndex = hashString(module.title) % iconColors.length;

            return (
              <div key={module.id} className="w-full">
                <Tile
                  label={module.title}
                  leadingContent={() => (
                    <module.icon
                      size={36}
                      style={{ color: iconColors[colorIndex] }}
                    />
                  )}
                  trailingContent={() => <ChevronRight size={36} />}
                  headerAlignment={ALIGNMENT.left}
                  bodyAlignment={ALIGNMENT.left}
                  onClick={() => handleTileClick(module.id)}
                  tileKind={TILE_KIND.action}
                  overrides={{
                    Root: {
                      style: {
                        height: "100%",
                        width: "100%",
                      },
                    },
                    Label: {
                      style: {
                        textAlign: "left",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.2em",
                        height: "2.4em",
                        minHeight: "2.4em",
                      },
                    },
                  }}
                >
                  <StyledParagraph>
                    {module.chapter_cnt} chapters
                  </StyledParagraph>
                </Tile>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-3"></div>
    </HomeContainer>
  );
}

export default withAuth(Page);
