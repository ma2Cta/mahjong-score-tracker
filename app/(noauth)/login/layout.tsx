"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

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
    return (
      <>
        <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
          <Image
          className="opacity-20"
            src={`/top_background.png`}
            alt="背景"
            layout={`fill`}
            objectFit={`cover`}
          />
        </div>
        {children}
      </>
    );
  }

  return null;
};

export default NoAuthLayout;
