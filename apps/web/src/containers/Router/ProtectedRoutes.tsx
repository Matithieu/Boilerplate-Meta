import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'

import LoadingCircular from '../../components/common/Loading/LoadingCircular'
import {
  toastErrorConnect,
  toastInfoSelectSubscription,
  toastSuccessAlreadySubscribed,
  toastWarnReconnect,
} from '../../components/common/Toasts'
import useAuthManager from '../../hooks/useAuthManager'
import useUserStore from '../../stores/UserStore'
import { fetchUser } from '../../utils/api/queries'
import { isNotNullOrUndefined } from '../../utils/assertion.util'
import { routesPath } from './routesPath'

export const ProtectedRoutes = () => {
  const { user, setUser } = useUserStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', user],
    queryFn: () => (user === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNullOrUndefined(data)) {
      setUser(data)
    }
  }, [data, setUser])

  if (isFetching) {
    return <LoadingCircular />
  }

  if (user === null && !isSuccess) {
    toastWarnReconnect()
    return <Navigate to={routesPath.base} />
  }

  if (user?.verified === false && isSuccess) {
    toastInfoSelectSubscription()
    return <Navigate to={routesPath.base} />
  }

  return <Outlet />
}

export const ProtectedSimpleRoutes = () => {
  const { user, setUser } = useUserStore()
  const authManager = useAuthManager()
  const urlLocation = window.location.pathname

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', user],
    queryFn: () => (user === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNullOrUndefined(data)) {
      setUser(data)
    }
  }, [data, setUser])

  if (isFetching) {
    return <LoadingCircular />
  }

  if (user === null && !isSuccess) {
    toastErrorConnect()
    return <Navigate to={routesPath.base} />
  }

  if (
    user?.verified === false &&
    urlLocation !== routesPath.subscription &&
    isSuccess
  ) {
    toastInfoSelectSubscription()
    return <Navigate to={routesPath.subscription} />
  }

  if (user?.verified && urlLocation === routesPath.subscription) {
    toastSuccessAlreadySubscribed()
    // Renew the cookie to have the correct roles
    authManager.signIn()
  }

  return <Outlet />
}
