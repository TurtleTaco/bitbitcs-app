"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "app/context/AuthContext";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
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
    // }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
