import { paths } from '@/types/codegen/api'

import {
  toastErrorQuotaExceeded,
  toastSuccessAlreadySubscribed,
  toastWarnReconnect,
} from '../../../components/common/Toasts'

const handleToastErrors = async (response: Response, url: keyof paths) => {
  switch (response.status) {
    case 403:
      return toastWarnReconnect()

    case 409:
      return toastSuccessAlreadySubscribed()

    case 429:
      return toastErrorQuotaExceeded()
    case 200:
    case 201:
    case 204:
      break
    default:
      throw new Error(`Failed to fetch data from ${url} - ${response.status}`)
  }
}

export default handleToastErrors
