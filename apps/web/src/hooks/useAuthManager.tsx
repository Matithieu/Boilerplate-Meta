import useConfigurationStore from '@/stores/ConfigurationStore'
import { asserts, isNotNullOrUndefined } from '@/utils/assertion.util'

/**
 * Provides signIn and signOut functions to handle OAuth login and logout.
 */
export default function useAuthManager() {
  const { configuration } = useConfigurationStore()
  asserts(
    isNotNullOrUndefined(configuration),
    'Configuration must be set to use AuthManager',
  )

  return {
    signIn: () => {
      const signInUrl = new URL(configuration?.oauthSignInUrl)
      signInUrl.searchParams.set('rd', configuration?.oauthSignInRedirectUrl)
      window.location.href = signInUrl.toString()
    },
    signOut: () => {
      const signOutUrl = new URL(configuration?.oauthSignOutUrl)
      signOutUrl.searchParams.set('rd', configuration?.oauthSignOutRedirectUrl)
      window.location.href = signOutUrl.toString()
    },
  }
}
