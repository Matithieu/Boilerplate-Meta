import { Configuration } from '@/types/index.types'

export const loadEnvConfigFallback = (config: Configuration) => {
  return {
    oauthBaseUrl: import.meta.env.VITE_OAUTH_BASE_URL ?? config.oauthBaseUrl,
    oauthSignInUrl:
      import.meta.env.VITE_OAUTH_SIGNIN_URL ?? config.oauthSignInUrl,
    oauthSignOutUrl:
      import.meta.env.VITE_OAUTH_SIGNOUT_URL ?? config.oauthSignOutUrl,
    oauthSignInRedirectUrl:
      import.meta.env.VITE_OAUTH_SIGNIN_REDIRECT_URL ??
      config.oauthSignInRedirectUrl,
    oauthSignOutRedirectUrl:
      import.meta.env.VITE_OAUTH_SIGNOUT_REDIRECT_URL ??
      config.oauthSignOutRedirectUrl,
    stripePriceIdFree:
      import.meta.env.VITE_STRIPE_PRICE_ID_FREE ?? config.stripePriceIdFree,
    stripePriceIdBasic:
      import.meta.env.VITE_STRIPE_PRICE_ID_BASIC ?? config.stripePriceIdBasic,
    stripePriceIdPremium:
      import.meta.env.VITE_STRIPE_PRICE_ID_PREMIUM ??
      config.stripePriceIdPremium,
    stripeBillingPortalCode:
      import.meta.env.VITE_STRIPE_BILLING_PORTAL_CODE ??
      config.stripeBillingPortalCode,
    publicPostHogHost:
      import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? config.publicPostHogHost,
    publicPostHogKey:
      import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? config.publicPostHogKey,
  } satisfies Configuration
}
