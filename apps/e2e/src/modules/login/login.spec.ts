import { expect, test } from '@playwright/test'

import { config } from '../../config/config.config'

test.use({
  ignoreHTTPSErrors: true,
})

test('TS-0: Login manualy into the app with valid credentials', async ({ page }) => {
  await page.goto(config.BASE_URL)

  await expect(async () => {
    expect(page.url()).toBe(`${config.BASE_URL}/ui`)
  }).toPass()

  await page.getByRole('button', { name: 'Get started' }).click()

  // Keycloak login
  const username = config.USERNAME
  const password = config.PASSWORD

  await page.getByRole('textbox', { name: 'Email' }).fill(username)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(async () => {
    expect(page.url()).toBe(`${config.BASE_URL}/ui/ai`)
  }).toPass()
})
