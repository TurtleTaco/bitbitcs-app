// app/home/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { MdOutlineDiamond } from "react-icons/md";
import { styled } from "styletron-react";
import { StyledDivider } from "baseui/divider";
import { Tile, TILE_KIND, ALIGNMENT, StyledParagraph } from "baseui/tile";
import { ChevronRight } from "baseui/icon";
import {
  RiShieldKeyholeLine,
  RiDatabase2Line,
  RiFlowChart,
  RiLockLine,
  RiAlarmWarningLine,
  RiPercentLine,
} from "react-icons/ri";
import { FaBoltLightning } from "react-icons/fa6";
import { useAuth } from "app/context/AuthContext";
import { withAuth } from "app/hoc/withAuth";
import {
  useGetStudyPlan,
  useCourseOutline,
  useDailyCheckIns,
  FieldModule,
} from "app/utils/api";
import { Skeleton } from "baseui/skeleton";
import { Tag, HIERARCHY } from "baseui/tag";
import { Select, Value } from "baseui/select";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ProgressBar } from "baseui/progress-bar";

const HomeContainer = styled("div", {
  padding: "10px",
});

function Page() {
  const router = useRouter();
  const [css] = useStyletron();
  const { user } = useAuth();

  const { data: studyPlanData, isLoading: isStudyPlanLoading } =
    useGetStudyPlan();
  const { data: courseOutline, isLoading: isCourseOutlineLoading } =
    useCourseOutline();
  const { data: dailyCheckIns, isLoading: isDailyCheckInsLoading } =
    useDailyCheckIns();

  const iconColors = [
    "#166c3b",
    "#276ef1",
    "#9747FF",
    "#7356BF",
    "#EA6B16",
    "#E11900",
    "#1E54B7",
    "#5F6B7C",
    "#05944F",
    "#C63A38",
    "#F4C61F",
    "#2089B5",
    "#A872B9",
    "#FF6154",
    "#454545",
  ];

  const icons = [
    RiShieldKeyholeLine,
    RiDatabase2Line,
    RiFlowChart,
    RiLockLine,
    RiAlarmWarningLine,
    RiPercentLine,
  ];

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const getUniqueModules = () => {
    if (!studyPlanData) return [];
    const moduleSet = new Set<string>();
    studyPlanData.study_plans.forEach((plan) => {
      plan.study_plan_chapters.forEach((chapter) => {
        moduleSet.add(chapter.module_name);
      });
    });
    return Array.from(moduleSet);
  };

  const getModuleInfo = (moduleName: string) => {
    if (!courseOutline) return null;
    for (const field of courseOutline.course_outline.fields) {
      const module = field.modules.find((m) => m.title === moduleName);
      if (module) return { module, fieldName: field.title };
    }
    return null;
  };

  const uniqueModules = getUniqueModules();
  const moduleInfos = uniqueModules
    .map((moduleName) => getModuleInfo(moduleName))
    .filter(Boolean);

  const handleModuleSelect = (fieldName: string, module: FieldModule) => {
    router.push(
      `/moduleinfo?field_name=${encodeURIComponent(
        String(fieldName)
      )}&module_name=${encodeURIComponent(module.title)}&module_view=true`
    );
  };

  const getDifficultyTag = (categorization: string) => {
    switch (categorization) {
      case "fundamental":
        return (
          <Tag
            closeable={false}
            hierarchy={HIERARCHY.secondary}
            kind="positive"
            overrides={{
              Root: {
                style: {
                  margin: "0",
                  // padding: "0",
                  paddingLeft: "0",
                  paddingRight: "0",
                },
              },
            }}
          >
            Fundamental
          </Tag>
        );
      case "comprehensive":
        return (
          <Tag
            closeable={false}
            hierarchy={HIERARCHY.secondary}
            kind="warning"
            overrides={{
              Root: {
                style: {
                  margin: "0",
                  // padding: "0",
                  paddingLeft: "0",
                  paddingRight: "0",
                },
              },
            }}
          >
            Intermediate
          </Tag>
        );
      case "extensive":
        return (
          <Tag
            closeable={false}
            hierarchy={HIERARCHY.secondary}
            kind="negative"
            overrides={{
              Root: {
                style: {
                  margin: "0",
                  // padding: "0",
                  paddingLeft: "0",
                  paddingRight: "0",
                },
              },
            }}
          >
            Advanced
          </Tag>
        );
      default:
        return null;
    }
  };

  const isLoading =
    isStudyPlanLoading || isCourseOutlineLoading || isDailyCheckInsLoading;

  return (
    <HomeContainer className="p-4">
      <ListHeading
        heading={`Hello, ${
          user?.displayName || user?.email?.split("@")[0] || ""
        }!`}
        subHeading="Finish a topic to start a streak"
        maxLines={1}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.secondary}>
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
          {dailyCheckIns?.map((checkIn, index) => (
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
              <div style={{ marginTop: "8px", fontSize: "12px" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri"][index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ListHeading heading="Personalized studies" maxLines={1} />
      <div className="px-3">
        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          <div key={"placeholder-personalized-goal"} className="w-full">
            <Tile
              label="Cloud Architecture"
              leadingContent={() => (
                <div>
                  <RiDatabase2Line size={36} style={{ color: iconColors[2] }} />
                  <div className="pt-2">
                    <Tag
                      closeable={false}
                      hierarchy={HIERARCHY.secondary}
                      kind="negative"
                      overrides={{
                        Root: {
                          style: {
                            margin: "0",
                            paddingLeft: "0",
                            paddingRight: "0",
                          },
                        },
                      }}
                    >
                      Personalized
                    </Tag>
                  </div>
                </div>
              )}
              trailingContent={() => <ChevronRight size={36} />}
              headerAlignment={ALIGNMENT.left}
              bodyAlignment={ALIGNMENT.left}
              onClick={() => console.log("Personalized goal clicked")}
              tileKind={TILE_KIND.selection}
              overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    height: "100%",
                    width: "100%",
                    outline: `${$theme.colors.primary300} solid`,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }),
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
              <StyledParagraph>4 chapters</StyledParagraph>
              <ProgressBar value={80} />
            </Tile>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => console.log("clicked add personalized goal")}
              kind="secondary"
              shape="circle"
              size="large"
              overrides={{
                BaseButton: {
                  style: {
                    backgroundColor: "transparent",
                  },
                },
              }}
            >
              <IoIosAddCircleOutline size={36} />
            </Button>
          </div>
        </div>
      </div>

      <ListHeading heading="Continue learning" maxLines={1} />

      <div className="px-3">
        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    height="100px"
                    width="100%"
                    animation
                    overrides={{
                      Root: {
                        style: {
                          marginBottom: "10px",
                          borderRadius: "8px",
                        },
                      },
                    }}
                  />
                ))
            : moduleInfos.map((moduleInfo, index) => {
                if (!moduleInfo) return null;
                const { module, fieldName } = moduleInfo;
                const colorIndex = hashString(module.title) % iconColors.length;
                const IconComponent = icons[index % icons.length];

                return (
                  <div key={module.title} className="w-full">
                    <Tile
                      label={module.title}
                      leadingContent={() => (
                        <div>
                          <IconComponent
                            size={36}
                            style={{ color: iconColors[colorIndex] }}
                          />
                          <div className="pt-2">
                            {getDifficultyTag(module.categorization)}
                          </div>
                        </div>
                      )}
                      trailingContent={() => <ChevronRight size={36} />}
                      headerAlignment={ALIGNMENT.left}
                      bodyAlignment={ALIGNMENT.left}
                      onClick={() => handleModuleSelect(fieldName, module)}
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
                        {module.chapters.length} chapters
                      </StyledParagraph>
                      <ProgressBar value={40} />
                    </Tile>
                  </div>
                );
              })}
        </div>
      </div>
    </HomeContainer>
  );
}

export default withAuth(Page);
