import { Page } from '@playwright/test'

export async function waitForQueryResponse<T = unknown>(page: Page, serverUrl: string, times = 1) {
  let calledTimes = 0

  return await page
    .waitForResponse(async resp => {
      if (resp.request().url().match(serverUrl)) {
        try {
          return ++calledTimes === times
        } catch (e) {
          console.error(e)
        }
      }

      return false
    })
    .then(res => {
      if (!res.headers()['content-type'].startsWith('application/json')) {
        throw new Error(`Unexpected response content type: ${res.headers()['content-type']}`)
      }

      return res.json()
    })
    .then((body: T | undefined) => body!)
}
