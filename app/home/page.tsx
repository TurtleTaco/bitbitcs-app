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
import { styled } from "styletron-react";

const HomeContainer = styled("div", {
  padding: "10px",
});

export default function Page() {
  const router = useRouter();

  return <HomeContainer>Home</HomeContainer>;
}
