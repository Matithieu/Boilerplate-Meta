import Button from '@/components/ui/button'
import { useAppNavigate } from '@/hooks/useAppNavigate'
import useAuthManager from '@/hooks/useAuthManager'
import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { FC } from 'react'

type MessageButtonProps = {
  message?: string
}

type ButtonProps = {
  message: MessageButtonProps['message']
  handleButtonClick: () => void
  buttonLabel: string
}

const ActionButton: FC<ButtonProps> = ({
  message,
  handleButtonClick,
  buttonLabel,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '1rem',
      }}
    >
      {message && <p>{message}</p>}
      <Button onClick={handleButtonClick}>{buttonLabel}</Button>
    </div>
  )
}

export const LoginButtonWithMessage: FC<MessageButtonProps> = ({ message }) => {
  const authUser = useAuthManager()

  return (
    <ActionButton
      buttonLabel={formatMessage(commonMessages.toLogin)}
      handleButtonClick={authUser.signIn}
      message={message}
    />
  )
}

export const ReConnectButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const authUser = useAuthManager()

  return (
    <ActionButton
      buttonLabel={formatMessage(commonMessages.toReconnect)}
      handleButtonClick={authUser.signIn}
      message={message}
    />
  )
}

export const SelectSubscriptionButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const { navigation } = useAppNavigate()

  return (
    <ActionButton
      buttonLabel={formatMessage(commonMessages.subscribe)}
      handleButtonClick={navigation.toSubscription}
      message={message}
    />
  )
}

export const QuotaExceededButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const { navigation } = useAppNavigate()

  return (
    <ActionButton
      buttonLabel={formatMessage(commonMessages.changePlan)}
      handleButtonClick={navigation.toAccount}
      message={message}
    />
  )
}
