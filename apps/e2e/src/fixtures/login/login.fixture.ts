import { Page } from '@playwright/test'

import { test as base } from '../global-hook'
import { login } from './login.util'

import { config } from '#/config/config.config'

export const test = base.extend<Page>({
  page: async ({ page }, use) => {
    await login(page, config.USERNAME, config.PASSWORD)
    await use(page)
  },
})

export { expect, type Page } from '@playwright/test'
