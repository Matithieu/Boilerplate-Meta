import LoadingCircular from '@/components/common/Loading/LoadingCircular'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router'

import useUserStore from '../../../stores/UserStore'
import { fetchUser } from '../../../utils/api/queries'
import { isNullOrUndefined } from '../../../utils/assertion.util'

export const AuthenticateUser: FC = () => {
  const { setUser, user } = useUserStore()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['auth-user-query'],
    queryFn: fetchUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNullOrUndefined(data)) return
    setUser(data)
  }, [data, setUser])

  // Block while query succeeded but the effect hasn't updated the store yet
  if (isLoading || (isSuccess && user === null)) {
    return <LoadingCircular />
  }

  return <Outlet />
}
