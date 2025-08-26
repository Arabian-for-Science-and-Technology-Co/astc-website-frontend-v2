import { defineNuxtPlugin } from '#app'
import type { $Fetch, FetchOptions, FetchRequest } from 'ofetch'
import { applyPolicyOrThrow } from '~/utils/api-error-policy'
import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const i18n = nuxtApp.$i18n as unknown as Composer

  const raw = $fetch.create({
    baseURL: config.public.BASE_URL,
    retry: 1,
    timeout: 30_000,
    async onRequest({ options }) {
      const token = useCookie<string | null>('redirect_token').value
      const lang = String(i18n?.locale?.value ?? 'en')

      // Normalize to Headers to avoid TS complaints
      const headers = new Headers(options.headers as HeadersInit)
      headers.set('Accept-Language', lang)
      if (token) headers.set('Authorization', `Bearer ${token}`)
      options.headers = headers
    },
    async onResponseError({ response }) {
      const err = Object.assign(new Error(response.statusText || 'Request failed'), {
        status: response.status,
        statusCode: response.status,
        statusMessage: response.statusText,
        data: response._data
      })
      throw err
    }
  })

  // Wrap and FORWARD generics to `raw<T>`
  const apiFetch = async function apiFetch<T>(
    request: FetchRequest,
    opts?: FetchOptions
  ): Promise<T> {
    try {
      return await raw<T>(request, opts as any)
    } catch (e) {
      applyPolicyOrThrow(e)
      throw e
    }
  } as unknown as $Fetch

  // keep helpers
  // @ts-expect-error - assign runtime helpers for parity with $fetch
  apiFetch.raw = raw.raw
  // @ts-expect-error
  apiFetch.native = raw.native
  apiFetch.create = (defaults: any) => {
    const created = raw.create(defaults)
    // wrap the created instance too
    const wrap = async function apiFetchCreated<T>(req: any, o?: FetchOptions): Promise<T> {
      try {
        return await created<T>(req, o as any)
      } catch (e) {
        applyPolicyOrThrow(e)
        throw e
      }
    } as unknown as $Fetch
    // @ts-expect-error
    wrap.raw = created.raw
    // @ts-expect-error
    wrap.native = created.native
    wrap.create = apiFetch.create
    return wrap
  }

  return { provide: { apiFetch } }

  // return { provide: { apiFetch: raw } }
})
