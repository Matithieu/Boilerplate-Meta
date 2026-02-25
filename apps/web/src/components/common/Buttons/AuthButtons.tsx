import Button from '@/components/ui/button'
import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'

export const LoginButton: FC = () => {
  const authUser = useAuthManager()

  return (
    <Button onClick={() => authUser.signIn()}>
      {formatMessage(commonMessages.toLogin)}
    </Button>
  )
}

export const LogoutButton: FC = () => {
  const authUser = useAuthManager()

  return (
    <Button onClick={() => authUser.signOut()}>
      {formatMessage(commonMessages.toLogout)}
    </Button>
  )
}
