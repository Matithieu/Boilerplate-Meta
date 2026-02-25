import { NavigateOptions, useNavigate } from 'react-router'

import { routesPath } from '../containers/Router/routesPath'

/**
 * This hook provides a set of predefined navigation functions
 */
export const useAppNavigate = () => {
  const navigate = useNavigate()

  // Generic navigation helper
  const navigateTo = (path: string, state?: NavigateOptions) => {
    navigate(path, state ? { state } : undefined)

    /**
     * When navigating to /ui#hash, scroll to the element with the id of hash
     * The hash can be #pricing, #faq, #testimonials...
     */
    if (path.includes('#')) {
      const [_, hash] = path.split('#')

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)

          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100) // Delay to ensure the DOM is updated
      }
    }
  }

  // Predefined navigation functions
  const navigation = {
    toHome: () => navigateTo(routesPath.base),
    toAi: () => navigateTo(routesPath.ai),
    toSettings: () => navigateTo(routesPath.settings),
    toAccount: () => navigateTo(routesPath.account),
    toTerms: () => navigateTo(routesPath.terms),
    toPrivacy: () => navigateTo(routesPath.privacy),
    toDashboard: () => navigateTo(routesPath.dashboard),
    toLegal: () => navigateTo(routesPath.legal),
    toSubscription: () => navigateTo(routesPath.subscription),
    toFailure: () => navigateTo(routesPath.failure),
    toOrderConfirmation: () => navigateTo(routesPath.completion),
    toErrorNotFound: () => navigateTo(routesPath.errorNotFound),
    toPage: (path: string, state?: NavigateOptions) => navigateTo(path, state),
  }

  return { navigation }
}
