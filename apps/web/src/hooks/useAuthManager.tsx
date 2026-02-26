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
    /**
     * This method can be used to renew the OAuth2 cookie
     * @example after a user subscribes, we want to make sure they have the correct roles in their cookie,
     * so we redirect them to the signIn route which will renew the cookie with the correct roles
     */
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
