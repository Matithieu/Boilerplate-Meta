import { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

import { StorageService } from '../../services/storage'
import { AppLocale, appLocaleToTranslationMessages } from './types'

type LocaleProviderProps = {
  children: ReactNode
}

const LocaleProvider: FC<LocaleProviderProps> = ({ children }) => {
  const storage = new StorageService<AppLocale>()
  const languageAppLocale: AppLocale = storage.getItem('language') || 'fr-FR'

  return (
    <IntlProvider
      locale={languageAppLocale}
      messages={appLocaleToTranslationMessages[languageAppLocale]}
    >
      {children}
    </IntlProvider>
  )
}

export default LocaleProvider
