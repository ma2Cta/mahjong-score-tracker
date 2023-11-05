'use client'

import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        fetcher
      }}
    >
      {children}
    </SWRConfig>
  )
}
