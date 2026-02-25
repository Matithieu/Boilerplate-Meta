import { Page } from '@playwright/test'

import { Common } from '#/fixtures/common'
import { test as base } from '#/fixtures/common'

import { settingsRoute } from './settings.type'

export class SettingsPage {
  #common: Common
  #page: Page

  constructor(common: Common, page: Page) {
    this.#common = common
    this.#page = page
  }

  async navigate<R extends settingsRoute>(route: R) {
    return this.#common.navigate(route)
  }

  async changeLanguage(targetLanguage: 'Français' | 'English') {
    const originLanguage = targetLanguage === 'Français' ? 'English' : 'Français'

    const comboxBox = this.#page.getByRole('combobox').filter({
      hasText: originLanguage,
    })

    await comboxBox.click()
    await this.#page.getByRole('listbox').getByText(targetLanguage).click()
  }
}

export type SettingsFixture = {
  settings: SettingsPage
}

export const test = base.extend<SettingsFixture>({
  settings: async ({ common, page }, use) => {
    await use(new SettingsPage(common, page))
  },
})

export { expect, type Page } from '@playwright/test'
