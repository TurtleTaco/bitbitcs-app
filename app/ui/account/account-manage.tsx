"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { ListHeading } from "baseui/list";

import {
  MdManageAccounts,
  MdLogout,
  MdLogin,
  MdHelpCenter,
  MdFeedback,
  MdPolicy,
  MdPrivacyTip,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { styled } from "styletron-react";

import { useAuth } from "../../context/AuthContext";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

const ProfileContainer = styled("div", {
  padding: "10px",
});

const ClickableListItem = styled(ListItem, {
  cursor: "pointer",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

const ArrowIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
});

const LogoutLabel = styled("span", {
  color: "#E11900",
});

const LoginLabel = styled("span", {
  color: "#166c3b",
});

export default function AccountManage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await FirebaseAuthentication.signOut();
      const auth = getAuth();
      await firebaseSignOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = () => {
    router.push("/");
  };

  const renderListItem = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
    isAuthAction: boolean = false
  ) => (
    <ClickableListItem
      artwork={() => icon}
      artworkSize={ARTWORK_SIZES.LARGE}
      endEnhancer={() => (
        <ArrowIcon>
          <MdKeyboardArrowRight />
        </ArrowIcon>
      )}
      onClick={onClick}
    >
      <ListItemLabel>
        {isAuthAction ? (
          user ? (
            <LogoutLabel>{label}</LogoutLabel>
          ) : (
            <LoginLabel>{label}</LoginLabel>
          )
        ) : (
          label
        )}
      </ListItemLabel>
    </ClickableListItem>
  );

  return (
    <ProfileContainer>
      <ListHeading heading="Account" maxLines={1} />
      {user &&
        renderListItem(<MdManageAccounts />, "Manage Account", () =>
          router.push("/profile/account")
        )}
      {renderListItem(
        user ? <MdLogout /> : <MdLogin />,
        user ? "Log out" : "Log in",
        user ? handleLogout : handleLogin,
        true
      )}

      <ListHeading heading="Support" maxLines={1} />
      {renderListItem(<MdHelpCenter />, "Help center", () => {})}
      {renderListItem(<MdFeedback />, "Content Feedback", () => {})}

      <ListHeading heading="Terms" maxLines={1} />
      {renderListItem(<MdPolicy />, "Terms of use", () => {})}
      {renderListItem(<MdPrivacyTip />, "Privacy Policy", () => {})}
    </ProfileContainer>
  );
}