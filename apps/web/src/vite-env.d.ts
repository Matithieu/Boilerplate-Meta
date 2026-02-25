/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

export interface ImportMetaEnv {
  readonly VITE_PROXY_BASE_URL: string

  readonly VITE_OAUTH_BASE_URL: string
  readonly VITE_OAUTH_SIGNIN_URL: string
  readonly VITE_OAUTH_SIGNOUT_URL: string
  readonly VITE_OAUTH_SIGNIN_REDIRECT_URL: string
  readonly VITE_OAUTH_SIGNOUT_REDIRECT_URL: string

  readonly VITE_STRIPE_PRICE_ID_FREE: string
  readonly VITE_TRIPE_PRICE_ID_BASIC: string
  readonly VITE_STRIPE_PRICE_ID_PREMIUM: string
  readonly VITE_STRIPE_BILLING_PORTAL_CODE: string

  readonly VITE_REACT_APP_PUBLIC_POSTHOG_KEY: string
  readonly VITE_REACT_APP_PUBLIC_POSTHOG_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
