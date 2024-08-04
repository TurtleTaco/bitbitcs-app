import React from "react";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { initializeFirebaseAuth } from "app/firebase/firebaseConfig";
import { useAuth } from "app/context/AuthContext";
import { Button, SIZE, SHAPE, KIND } from "baseui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton: React.FC = () => {
  const { user } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result.credential?.idToken) {
        const auth = await initializeFirebaseAuth();
        const credential = GoogleAuthProvider.credential(
          result.credential.idToken
        );
        await signInWithCredential(auth, credential);
      } else {
        console.error("No ID token received from Google Sign-In");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOut = async () => {
    try {
      await FirebaseAuthentication.signOut();
      const auth = await initializeFirebaseAuth();
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button
      onClick={user ? signOut : signInWithGoogle}
      startEnhancer={() => <FcGoogle size={20} />}
      size={SIZE.default}
      shape={SHAPE.default}
      kind={KIND.secondary}
      overrides={{
        BaseButton: {
          style: {
            width: "100%",
            marginBottom: "1rem",
          },
        },
      }}
    >
      {user ? "Sign out" : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;
