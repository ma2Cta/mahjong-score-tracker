"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          fetcher,
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
}
