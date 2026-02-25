import { paths } from '@/types/codegen/api'
import { isNullOrUndefined } from '@/utils/assertion.util'

import { CombinedParametersType } from '../api.types'
import handleStatusError from '../errors/handleStatusError'
import handleToastErrors from '../errors/handleToastErrors'

export const customFetch = async <
  U extends keyof paths,
  M extends keyof paths[U],
>(
  url: U,
  method: M,
  options?: CombinedParametersType<U, M>,
): Promise<
  paths[U][M] extends { responses: { 200: { content: { '*/*': infer R } } } }
    ? R
    : unknown
> => {
  const { requestBody, parameters } = options || {}

  const baseUrl = import.meta.env.VITE_API_PREFIX ?? '/api'
  let finalUrl = baseUrl + url

  const fetchOptions: RequestInit = {
    method: method.toString().toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // handle path params
  if (
    parameters &&
    typeof parameters === 'object' &&
    'path' in parameters &&
    parameters.path
  ) {
    Object.entries(parameters.path).forEach(([key, value]) => {
      if (isNullOrUndefined(value)) return

      finalUrl = finalUrl.replace(
        new RegExp(`{${key}}`, 'g'),
        encodeURIComponent(String(value)),
      )
    })
  }

  // handle query params
  if (
    parameters &&
    typeof parameters === 'object' &&
    'query' in parameters &&
    parameters.query
  ) {
    const searchParams = new URLSearchParams()
    Object.entries(parameters.query).forEach(([key, value]) => {
      if (isNullOrUndefined(value)) return

      searchParams.append(key, String(value))
    })

    if (searchParams.toString()) {
      finalUrl += `?${searchParams.toString()}`
    }
  }

  // handle request body for non-GET methods
  if (
    requestBody &&
    method !== 'get' &&
    method !== 'delete' &&
    method !== 'head'
  ) {
    fetchOptions.body = JSON.stringify(requestBody)
  }

  const response = await fetch(finalUrl, fetchOptions)

  if (!response.ok) {
    handleToastErrors(response, url)
    throw new Error(
      await handleStatusError(response, `Error fetching data from ${url}`),
    )
  }

  // Check if response has content
  const contentLength = response.headers.get('content-length')
  const contentType = response.headers.get('content-type')

  // Return null for empty responses (DELETE, 204, or no content)
  if (
    response.status === 204 ||
    contentLength === '0' ||
    !contentType?.includes('application/json')
  ) {
    return null as unknown as paths[U][M] extends {
      responses: { 200: { content: { '*/*': infer R } } }
    }
      ? R
      : unknown
  }

  return await response.json()
}
