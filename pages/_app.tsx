import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </NextUIProvider>
  );
}
