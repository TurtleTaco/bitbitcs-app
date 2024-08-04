"use client";

import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "app/ui/GoogleSignInButton";
import { useAuth } from "app/context/AuthContext";

export default function Page() {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState<number>(3);
  const { user, loading, displayName, email, token } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user && !loading) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is signed in, we don't need to render anything here
  // as the useEffect will handle the redirection
  if (user) {
    return null;
  }

  return (
    <main className="flex flex-col">
      <h1>Please sign in</h1>
      <GoogleSignInButton />
    </main>
  );
}