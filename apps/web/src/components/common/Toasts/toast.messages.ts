import { defineMessages } from 'react-intl'

const scope = 'toasts'

export default defineMessages({
  errorConnect: {
    defaultMessage: 'Please log in to continue.',
    id: `${scope}.error.connect`,
  },
  errorReconnect: {
    defaultMessage: 'Please reconnect to continue.',
    id: `${scope}.error.reconnect`,
  },
  infoSelectSubscription: {
    defaultMessage:
      'Already connected, please select a subscription to continue.',
    id: `${scope}.info.selectSubscription`,
  },
  successAlreadySubscribed: {
    defaultMessage:
      'You are already subscribed! Clear your cookies to change accounts.',
    id: `${scope}.success.alreadySubscribed`,
  },
  errorQuotaExceeded: {
    defaultMessage:
      'Quota exceeded! Change your plan to continue or wait until tomorrow.',
    id: `${scope}.error.quotaExceeded`,
  },
})
