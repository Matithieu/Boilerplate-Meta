import { toast } from 'react-toastify'

import { formatMessage } from '../../../services/intl/intl'
import {
  LoginButtonWithMessage,
  QuotaExceededButtonWithMessage,
  ReConnectButtonWithMessage,
  SelectSubscriptionButtonWithMessage,
} from '../Buttons/ButtonsWithMessage'
import toastMessages from './toast.messages'

export function toastErrorConnect() {
  return toast.warn(
    <LoginButtonWithMessage
      message={formatMessage(toastMessages.errorConnect)}
    />,
  )
}

export function toastWarnReconnect(text?: string) {
  return toast.warn(
    <>
      <ReConnectButtonWithMessage
        message={formatMessage(toastMessages.errorReconnect)}
      />
      {text}
    </>,
  )
}

export function toastInfoSelectSubscription() {
  return toast.info(
    <SelectSubscriptionButtonWithMessage
      message={formatMessage(toastMessages.infoSelectSubscription)}
    />,
  )
}

export function toastSuccessAlreadySubscribed() {
  return toast.success(formatMessage(toastMessages.successAlreadySubscribed))
}

export function toastErrorQuotaExceeded() {
  return toast.error(
    <QuotaExceededButtonWithMessage
      message={formatMessage(toastMessages.errorQuotaExceeded)}
    />,
  )
}
