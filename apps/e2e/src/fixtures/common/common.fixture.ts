import { config } from '#/config/config.config'
import { test as base } from '#/fixtures/login'
import { Page } from '@playwright/test'

export class Common {
  #page: Page

  constructor(page: Page) {
    this.#page = page
  }

  async navigate(route: string) {
    return this.#page.goto(config.BASE_URL + '/ui/' + route)
  }
}

export type CommonFixture = {
  common: Common
}

export const test = base.extend<CommonFixture>({
  common: async ({ page }, use) => {
    await use(new Common(page))
  },
})

export { expect } from '@playwright/test'
