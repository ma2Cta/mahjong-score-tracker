import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'

export default function App({ Component, pageProps }: AppProps) {
  return <SWRConfig
      value={{
        revalidateIfStale: false,
        fetcher
      }}
    >
    <Component {...pageProps} />
  </SWRConfig>
}
