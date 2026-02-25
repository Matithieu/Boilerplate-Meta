import { paths } from '@/types/codegen/api'

export type RequestBodyType<
  U extends keyof paths,
  M extends keyof paths[U],
> = paths[U][M] extends {
  requestBody?: { content: { 'application/json': infer P } }
}
  ? P
  : paths[U][M] extends {
        requestBody: { content: { 'application/json': infer P } }
      }
    ? P
    : undefined

type ParametersType<
  U extends keyof paths,
  M extends keyof paths[U],
> = paths[U][M] extends { parameters: infer P } ? P : undefined

export type CombinedParametersType<
  U extends keyof paths,
  M extends keyof paths[U],
> = {
  requestBody?: RequestBodyType<U, M>
  parameters?: ParametersType<U, M>
}
