import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FC } from 'react'

import { changeAppLocales } from '../../../containers/LocaleProvider/constants'
import {
  AppLocale,
  appLocaleNames,
} from '../../../containers/LocaleProvider/types'
import { StorageService } from '../../../services/storage'

const ChangeLanguageSelect: FC = () => {
  const storage = new StorageService<AppLocale>()
  const languageAppLocale: AppLocale = storage.getItem('language') ?? 'fr-FR'

  const handleLanguageChange = (newLanguage: AppLocale) => {
    changeAppLocales({
      languageAppLocale: newLanguage,
    })
  }

  return (
    <Select
      value={languageAppLocale}
      onValueChange={(value) => handleLanguageChange(value as AppLocale)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(appLocaleNames).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ChangeLanguageSelect
