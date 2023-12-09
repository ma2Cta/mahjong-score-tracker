"use client";

import "@/styles/globals.css";
import Header from "@/app/_components/ui/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Footer from "@/app/_components/ui/Footer";
import { Toaster } from "@/app/_components/ui/toaster";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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
        <div className="flex flex-col min-h-screen">
          <nav className="fixed w-full z-10 px-10 p-3 bg-background border-b-2">
            <Header />
          </nav>
          <main className="flex-grow px-16 mt-24">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </>
    );
  }

  return null;
};

export default AuthLayout;
