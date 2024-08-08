"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { quantum } from "ldrs";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  quantum.register();
  return function WithAuth(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading, router]);

    // if (loading) {
    // return <div>Loading...withAuth</div>;
    // return <l-quantum size="45" speed="1.75" color="black"></l-quantum>;
    // }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
