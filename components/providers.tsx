'use client'

import { siteConfig } from '@/lib/site-config'
import { ProgressProvider } from '@bprogress/next/app'
import {
  matchQuery,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer'
import { ThemeProvider } from './theme-provider'


type ProviderProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        staleTime: 1000 * 60 * 15, // 15 minutes
      },
      mutations: {
        retry: false,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation: any) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            mutation.meta?.invalidates?.some((queryKey: any) =>
              matchQuery({ queryKey }, query),
            ),
        })
      },
    }),
  })

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height="4px"
        color={siteConfig.primaryColor}
        options={{ showSpinner: false }}
        shallowRouting
      >
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
          </QueryClientProvider>
        </NuqsAdapter>
      </ProgressProvider>
    </ThemeProvider>
  )
}