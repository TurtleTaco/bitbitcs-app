"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { styled } from "styletron-react";
import { Select, Value } from "baseui/select";
import { Tile, TILE_KIND, ALIGNMENT, StyledParagraph } from "baseui/tile";
import { ChevronRight } from "baseui/icon";
import { MdKeyboardArrowLeft } from "react-icons/md";
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
import { withAuth } from "app/hoc/withAuth";
import { fetchCourseOutline, CourseOutline, FieldModule } from "app/utils/api";
// import ModuleInfoComponent from "app/ui/moduleinfo/module_info";
import { Skeleton } from "baseui/skeleton";
import { Tag, HIERARCHY } from "baseui/tag";
import { MobileHeader } from "baseui/mobile-header";
import { ArrowLeft, Plus, Check } from "baseui/icon";
import { MdOutlineAddTask } from "react-icons/md";
import { useCourseOutline } from "app/utils/api";

const SearchContainer = styled("div", {
  padding: "20px",
});

const icons = [
  RiShieldKeyholeLine,
  RiDatabase2Line,
  RiFlowChart,
  RiLockLine,
  RiAlarmWarningLine,
  RiPercentLine,
  RiSearchLine,
];

function Page() {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const [selectedField, setSelectedField] = React.useState<Value>([]);

  // const [courseOutline, setCourseOutline] =
  //   React.useState<CourseOutline | null>(null);
  // const [isLoading, setIsLoading] = React.useState(true);
  const { data: courseOutline, isLoading, error } = useCourseOutline();

  const [selectedModule, setSelectedModule] =
    React.useState<FieldModule | null>(null);

  // const handleBackToOutline = () => {
  //   setSelectedModule(null);
  // };

  React.useEffect(() => {
    if (courseOutline) {
      const filteredOutline = {
        course_outline: {
          fields: courseOutline.course_outline.fields
            .map((field) => ({
              ...field,
              modules: field.modules.filter(
                (module) => module.categorization !== "emerging"
              ),
            }))
            .filter((field) => field.modules.length > 0),
        },
      };

      if (filteredOutline.course_outline.fields.length > 0) {
        setSelectedField([
          { id: "0", label: filteredOutline.course_outline.fields[0].title },
        ]);
      } else {
        setSelectedField([{ id: "0", label: "No fields available" }]);
      }
    } else if (error) {
      console.error("Error loading course outline:", error);
      setSelectedField([{ id: "0", label: "Error loading fields" }]);
    }
  }, [courseOutline, error]);

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

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const fieldOptions =
    courseOutline?.course_outline.fields.map((field, index) => ({
      id: index.toString(),
      label: field.title,
    })) || [];

  const selectedFieldModules =
    courseOutline?.course_outline.fields.find(
      (field) => field.title === selectedField[0]?.label
    )?.modules || [];

  const sortedModules = [...selectedFieldModules].sort((a, b) => {
    const order: { [key: string]: number } = {
      fundamental: 0,
      comprehensive: 1,
      extensive: 2,
    };
    return (
      order[a.categorization as keyof typeof order] -
      order[b.categorization as keyof typeof order]
    );
  });

  const handleModuleSelect = (module: FieldModule) => {
    const fieldName =
      selectedField[0] &&
      typeof selectedField[0] === "object" &&
      "label" in selectedField[0]
        ? selectedField[0].label
        : "";

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

  return (
    <SearchContainer className="p-4">
      <MobileHeader
        title="Course Finder"
        navButton={{
          renderIcon: ArrowLeft,
          onClick: () => router.back(),
          label: "Go back to the previous screen",
        }}
      />
      <div className="p-3">
        {(isLoading || fieldOptions.length > 1) && (
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <Select
              options={fieldOptions}
              labelKey="label"
              valueKey="id"
              searchable={false}
              clearable={false}
              onChange={({ value }) => setSelectedField(value)}
              value={selectedField}
              placeholder="Select a field"
              isLoading={isLoading}
            />
          </div>
        )}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Tile
                    key={index}
                    headerAlignment={ALIGNMENT.left}
                    bodyAlignment={ALIGNMENT.left}
                    tileKind={TILE_KIND.action}
                    overrides={{
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
                      Root: {
                        style: {
                          width: "100%",
                          height: "100px",
                          marginBottom: "16px",
                          borderRadius: "12px",
                        },
                      },
                    }}
                    leadingContent={() => (
                      <Skeleton
                        width="36px"
                        height="36px"
                        overrides={{
                          Root: {
                            style: {
                              borderRadius: "50%",
                            },
                          },
                        }}
                      />
                    )}
                  >
                    <Skeleton
                      width="80%"
                      height="20px"
                      animation
                      overrides={{
                        Root: {
                          style: {
                            marginBottom: "8px",
                          },
                        },
                      }}
                    />
                    <Skeleton width="60%" height="16px" animation />
                  </Tile>
                ))
            : sortedModules.map((module, index) => {
                const colorIndex = hashString(module.title) % iconColors.length;
                const IconComponent = icons[index % icons.length];

                return (
                  <div key={index} className="w-full relative">
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
                      onClick={() => handleModuleSelect(module)}
                      tileKind={TILE_KIND.action}
                      overrides={{
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
                        Root: {
                          style: {
                            width: "100%",
                            height: "100%",
                            position: "relative",
                          },
                        },
                      }}
                    >
                      <StyledParagraph
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        {module.chapters.length} chapters{" "}
                      </StyledParagraph>
                    </Tile>
                  </div>
                );
              })}
        </div>
      </div>
    </SearchContainer>
  );
}

export default withAuth(Page);