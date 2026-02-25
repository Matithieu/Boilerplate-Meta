import { config } from '#/config/config.config'
import { asserts } from '#/utils/assertion.util'
import { Page } from '@playwright/test'

export async function login(page: Page, username: string, password: string) {
  // If we are running locally (on the front-end), we need to change it to the reverse proxy URL
  const BASE_URL = config.BASE_URL.includes('localhost') ? 'https://localhost' : config.BASE_URL

  // We start the OAuth2 flow
  const loginResponse = await page.request.get(`${BASE_URL}/oauth2/sign_in`)

  if (loginResponse.status() !== 200) {
    throw new Error(`Got ${loginResponse.status()} from ${loginResponse.url()}`)
  }

  // We skip the login process if we are running locally (for development, NYI)
  // if (config.BASE_URL === 'http://localhost:5173') {
  //   return
  // }

  const loginBody = await loginResponse.text()

  // We parse the action URL from the login page
  const action = loginBody
    .replace(/^[\s\S]+action="(https?:[^"]+)"[\s\S]+$/m, '$1')
    .replace(/&amp;/g, '&')

  // Then we send the login request to authenticate
  const authenticateResponse = await page.request.post(action, {
    form: { username: username, password: password },
    maxRedirects: 0,
  })

  let location = authenticateResponse.headers().location

  // Keycloak requires a second action for the European Union cookie law
  if (location && location.includes('required-action')) {
    const actionResponse = await page.request.get(location)

    if (actionResponse.status() !== 200) {
      throw new Error(`Got ${actionResponse.status()} from ${actionResponse.url()}`)
    }

    const actionBody = await actionResponse?.text()
    const action2 = actionBody
      .replace(/^[\s\S]+action="(https?:[^"]+)"[\s\S]+$/m, '$1')
      .replace(/&amp;/g, '&')
    const actionPostResponse = await page.request.post(action2, {
      form: { accept: 'Accept' },
      maxRedirects: 0,
    })
    location = actionPostResponse.headers().location
  }

  asserts(location !== undefined, 'Location header is not defined')

  // We follow the redirect to the final location
  await page.request.get(location, { maxRedirects: 0 })
}

export async function logout(page: Page) {
  await page.click('#user-menu')
  await page.getByText('Logout').click()
}
