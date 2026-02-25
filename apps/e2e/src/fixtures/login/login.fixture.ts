import { login } from './login.util'
import { Page } from '@playwright/test'

import { config } from '#/config/config.config'
import { test as base } from '../global-hook'

export const test = base.extend<Page>({
  page: async ({ page }, use) => {
    await login(page, config.USERNAME, config.PASSWORD)
    await use(page)
  },
})

export { expect, type Page } from '@playwright/test'
