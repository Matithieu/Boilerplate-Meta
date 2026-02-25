import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import LoadingCircular from './components/common/Loading/LoadingCircular'
import ConfigurationProvider from './containers/Configuration/ConfigurationProvider'
import LocaleProvider from './containers/LocaleProvider/LocaleProvider'
import PostHogProvider from './containers/PostHog/PostHogProvider'
import AppRouter from './containers/Router/RouterProvider'
import { ShadCNTheme } from './containers/ShadCN/ThemeProvider'
import { injectAppGlobalStyles } from './theme/globalStyles'

injectAppGlobalStyles()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
})

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ConfigurationProvider>
          <PostHogProvider>
            <ShadCNTheme storageKey="web-theme">
              <LocaleProvider>
                <HelmetProvider>
                  <Suspense fallback={<LoadingCircular />}>
                    <AppRouter />
                  </Suspense>
                </HelmetProvider>
              </LocaleProvider>
            </ShadCNTheme>
          </PostHogProvider>
        </ConfigurationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
