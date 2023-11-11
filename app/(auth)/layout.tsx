"use client";

import "@/styles/globals.css";
import Header from "@/app/components/ui/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  if (status === "authenticated") {
    return (
      <>
        <nav className="px-10 pt-6 pb-4">
          <Header />
        </nav>
        <main className="px-16 pt-2">{children}</main>
      </>
    );
  }

  return null;
}
