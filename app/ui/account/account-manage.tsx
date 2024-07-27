"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ListHeading } from "baseui/list";
import { Button, KIND, SIZE } from "baseui/button";
import Link from "next/link";

// react icon
import { MdManageAccounts } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdHelpCenter } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { MdPolicy } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { styled } from "styletron-react";

const ProfileContainer = styled("div", {
  padding: "10px",
});

export default function AccountManage() {
  const router = useRouter();

  return (
    <ProfileContainer>
      <ListHeading heading="Account" maxLines={1} />
      <ListItem
        artwork={(props) => <MdManageAccounts />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Link href="/profile/account" passHref>
            <Button size={SIZE.compact} kind={KIND.tertiary}>
              <MdKeyboardArrowRight />
            </Button>
          </Link>
        )}
      >
        <ListItemLabel>Manage Account</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={(props) => <MdLogout />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            <MdKeyboardArrowRight />
          </Button>
        )}
      >
        <ListItemLabel>Log out</ListItemLabel>
      </ListItem>
      <ListHeading heading="Support" maxLines={1} />
      <ListItem
        artwork={(props) => <MdHelpCenter />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            <MdKeyboardArrowRight />
          </Button>
        )}
      >
        <ListItemLabel>Help center</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={(props) => <MdFeedback />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            <MdKeyboardArrowRight />
          </Button>
        )}
      >
        <ListItemLabel>Content Feedback</ListItemLabel>
      </ListItem>
      <ListHeading heading="Terms" maxLines={1} />
      <ListItem
        artwork={(props) => <MdPolicy />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            <MdKeyboardArrowRight />
          </Button>
        )}
      >
        <ListItemLabel>Terms of use</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={(props) => <MdPrivacyTip />}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            <MdKeyboardArrowRight />
          </Button>
        )}
      >
        <ListItemLabel>Privacy Policy</ListItemLabel>
      </ListItem>
    </ProfileContainer>
  );
}
