import { Navigate, Outlet } from 'react-router'

import {
  toastErrorConnect,
  toastInfoSelectSubscription,
  toastSuccessAlreadySubscribed,
  toastWarnReconnect,
} from '../../../components/common/Toasts'
import useAuthManager from '../../../hooks/useAuthManager'
import useUserStore from '../../../stores/UserStore'
import { routesPath } from '../routesPath'

export const ProtectedApplicationRoutes = () => {
  const { user } = useUserStore()

  if (user === null) {
    toastWarnReconnect()
    return <Navigate to={routesPath.base} />
  }

  if (user.verified === false) {
    toastInfoSelectSubscription()
    return <Navigate to={routesPath.base} />
  }

  return <Outlet />
}

export const ProtectedSubscriptionRoutes = () => {
  const { user } = useUserStore()
  const { signIn } = useAuthManager()
  const urlLocation = window.location.pathname

  if (user === null) {
    toastErrorConnect()
    return <Navigate to={routesPath.base} />
  }

  if (user.verified === false && urlLocation !== routesPath.subscription) {
    toastInfoSelectSubscription()
    return <Navigate to={routesPath.subscription} />
  }

  if (user?.verified && urlLocation === routesPath.subscription) {
    toastSuccessAlreadySubscribed()
    signIn()
  }

  return <Outlet />
}
