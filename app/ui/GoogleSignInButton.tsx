import React from "react";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { initializeFirebaseAuth } from "app/firebase/firebaseConfig";
import { useAuth } from "app/context/AuthContext";

const GoogleSignInButton: React.FC = () => {
  const { user } = useAuth();

  const signInWithGoogle = async () => {
    try {
      // Create credentials on the native layer
      const result = await FirebaseAuthentication.signInWithGoogle();

      // Sign in on the web layer using the id token
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
      // Sign out on the native layer
      await FirebaseAuthentication.signOut();
      // Sign out on the web layer
      const auth = await initializeFirebaseAuth();
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={user ? signOut : signInWithGoogle}>
      {user ? "Sign out" : "Sign in with Google"}
    </button>
  );
};

export default GoogleSignInButton;
