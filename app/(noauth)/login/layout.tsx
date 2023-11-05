"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  return null;
};

export default NoAuthLayout;
