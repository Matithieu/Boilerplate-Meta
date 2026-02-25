import {
  createIntl,
  createIntlCache,
  IntlFormatters,
  IntlShape,
  MessageDescriptor,
} from 'react-intl'

import {
  AppLocale,
  appLocaleToTranslationMessages,
} from '../../containers/LocaleProvider/types'
import { getLanguageAppLocale } from '../../containers/LocaleProvider/utils'
import { isNotNullOrUndefined } from '../../utils/assertion.util'

type IntlFormatMessageParams = Parameters<(typeof IntlService)['formatMessage']>
type FormatMessageValuesParams = IntlFormatMessageParams['1']

type IntlServiceType = {
  checkInstance: () => IntlShape
  formatMessage: IntlFormatters['formatMessage']
  formatMessagePlural: IntlFormatters['formatMessage']
  formatMessageSingle: IntlFormatters['formatMessage']

  initialize: () => IntlShape
  instance: IntlShape | null
  languageAppLocale: AppLocale
}

const IntlService: IntlServiceType = {
  instance: null,
  checkInstance: () => {
    if (isNotNullOrUndefined(IntlService.instance)) {
      return IntlService.instance
    }

    return IntlService.initialize()
  },
  initialize: () => {
    const languageAppLocale = getLanguageAppLocale()

    if (languageAppLocale === IntlService.instance?.locale) {
      return IntlService.instance
    }

    const cache = createIntlCache()

    return (IntlService.instance = createIntl(
      {
        locale: languageAppLocale,
        messages: appLocaleToTranslationMessages[languageAppLocale],
      },
      cache,
    ))
  },
  get languageAppLocale() {
    return getLanguageAppLocale()
  },
  formatMessage: (
    message: MessageDescriptor,
    values: FormatMessageValuesParams,
  ) => {
    return IntlService.checkInstance().formatMessage(message, {
      itemCount: (values?.itemCount as number) ?? 1,
      ...values,
    })
  },
  formatMessagePlural: (
    message: MessageDescriptor,
    values: FormatMessageValuesParams,
  ) => {
    return IntlService.checkInstance().formatMessage(message, {
      itemCount: 'many',
      ...values,
    })
  },
  formatMessageSingle: (
    message: MessageDescriptor,
    values: FormatMessageValuesParams,
  ) => {
    return IntlService.checkInstance().formatMessage(message, {
      itemCount: 1,
      ...values,
    })
  },
}

export const formatMessage = IntlService.formatMessage
export const formatMessagePlural = IntlService.formatMessagePlural
