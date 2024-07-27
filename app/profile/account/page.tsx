"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "baseui/avatar";

import * as React from "react";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ListHeading } from "baseui/list";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND, SIZE } from "baseui/button";
import Link from "next/link";
import { useStyletron } from "baseui";
import { Alert } from "baseui/icon";
import { validate as validateEmail } from "email-validator"; // add this package to your repo: `$ pnpm add email-validator`
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";

// react icon
import { MdKeyboardArrowLeft } from "react-icons/md";

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

export default function Page() {
  const userName = "Lin Sun";

  const router = useRouter();

  const [value, setValue] = React.useState("zac@gmail.com");
  const [isValid, setIsValid] = React.useState(false);
  const [isVisited, setIsVisited] = React.useState(false);
  const shouldShowError = !isValid && isVisited;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setIsValid(validateEmail(value));
    setValue(value);
  };

  // toggles
  const [emailNodify, setEmailNofigy] = React.useState(true);

  return (
    <div>
      <div className="flex justify-center pt-10">
        <Avatar name={userName} size="scale1600" />
      </div>

      <div className="pt-2 pr-2 pl-2">
        <ListHeading
          heading="Personal Info"
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
        <div className="p-4">
          <FormControl label={() => "Name"}>
            <Input value={userName} />
          </FormControl>
          <FormControl
            label="Your email"
            error={
              shouldShowError ? "Please input a valid email address" : null
            }
          >
            <Input
              id="input-id"
              value={value}
              onChange={onChange}
              onBlur={() => setIsVisited(true)}
              error={shouldShowError}
              overrides={shouldShowError ? { After: Negative } : {}}
            />
          </FormControl>
        </div>
        <ListHeading heading="Notifications" maxLines={1} />
        <div className="p-3">
          <Checkbox
            checked={emailNodify}
            checkmarkType={STYLE_TYPE.toggle}
            onChange={(e) => setEmailNofigy(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
          >
            Daily Practice Email Notification
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
