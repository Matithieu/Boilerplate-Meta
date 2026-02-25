import { expect } from '@playwright/test'

import { test } from '#/fixtures/settings'

import { config } from '../../config/config.config'

test.use({
  ignoreHTTPSErrors: true,
})

test('TS-3: Settings: Change language', async ({ page, settings }) => {
  await settings.navigate('settings')
  await expect(async () => {
    expect(page.url()).toBe(`${config.BASE_URL}/ui/settings`)
  }).toPass()

  await expect(page.getByRole('combobox')).toHaveText('Français')

  await settings.changeLanguage('English')

  await expect(page.getByRole('tabpanel').getByRole('heading', { name: 'Language' })).toBeVisible()
})
