import enTranslationMessages from '../../translations/en.json'
import frTranslationMessages from '../../translations/fr.json'
import { ValueOf } from '../../utils/types.util'

export const appLocales = {
  enUS: 'en-US',
  frFR: 'fr-FR',
} as const

export type AppLocale = ValueOf<typeof appLocales>

export const appLocaleToTranslationMessages: Record<
  AppLocale,
  Record<string, string>
> = {
  [appLocales.enUS]: enTranslationMessages,
  [appLocales.frFR]: frTranslationMessages,
}

export const appLocaleNames: {
  [key in AppLocale]: string
} = {
  [appLocales.enUS]: 'English',
  [appLocales.frFR]: 'Français',
}
