import { StorageService } from '../../services/storage'
import { isNotNullOrUndefined } from '../../utils/assertion.util'
import { DEFAULT_APP_LOCALE } from './locales'
import { AppLocale, appLocales } from './types'

function isValidAppLocale(locale: string): locale is AppLocale {
  return Object.values(appLocales).includes(locale as AppLocale)
}

export const getLanguageAppLocale = (): AppLocale => {
  const storage = new StorageService<AppLocale>()
  const possibleLanguageAppLocale: AppLocale =
    storage.getItem('language') || 'fr-FR'

  if (
    isNotNullOrUndefined(possibleLanguageAppLocale) &&
    isValidAppLocale(possibleLanguageAppLocale)
  ) {
    return possibleLanguageAppLocale
  }

  return DEFAULT_APP_LOCALE
}
