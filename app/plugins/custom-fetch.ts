import { defineNuxtPlugin } from '#app'
import { useRuntimeConfig, useCookie } from '#imports'
import type { Router } from 'vue-router'
import type { Ref } from 'vue'
import type { FetchOptions, FetchError, ResponseType } from 'ofetch'
import { transformToQueryString, type QueryParams } from '~/utils/transformToQueryString'

/* ------------------------ Types ------------------------ */

type MinimalResponse = { status: number; url: string }

// Only add what we need on top of ofetch's options.
// IMPORTANT: R is responseType (json/text/blob...), not your data type.
type CustomFetchOptions<R extends ResponseType = 'json'> = FetchOptions<R> & {
  /** opt-in cache by URL + params */
  withCache?: boolean
}

export type CustomFetch = <T = unknown, R extends ResponseType = 'json'>(
  url: string,
  options?: CustomFetchOptions<R>
) => Promise<T>

/* ------------------------ Handlers ------------------------ */

const handleUnauthenticated = async (res: MinimalResponse, locale: string, router: Router) => {
  if (res.status === 401 && res.url.includes('/auth/logout')) {
    const message = locale === 'en' ? 'You have been logged out' : 'تم تسجيل الخروج'
    // $toast.success(message)
    await router.push('/authentication/login')
  }

  if (
    res.status === 401 &&
    !res.url.includes('/auth/login') &&
    !res.url.includes('/auth/logout')
    // && authStore.user
  ) {
    // Optionally prompt and log out here
    return
  }
}

const handleUnauthorized = async (res: MinimalResponse, locale: string, router: Router) => {
  if (res.status === 403) {
    const message =
      locale === 'en'
        ? "You don't have permission to access this page"
        : 'ليس لديك الصلاحية للوصول إلى هذه الصفحة'
    // $toast.success(message)
    await router.push('/')
  }
}

const handleServerError = async (res: MinimalResponse, locale: string) => {
  if (res.status === 500) {
    const message = locale === 'en' ? 'Server error' : 'خطأ في الخادم'
    // log/report server error here if you want
  }
}

/* ------------------------ Nuxt Plugin ------------------------ */

export default defineNuxtPlugin((nuxtApp) => {
  const responseCache = new Map<string, unknown>()
  // Narrow to the small shape we use
  const { $router, $i18n } = nuxtApp as unknown as {
    $router: Router
    $i18n: { locale: Ref<string> }
  }
  const { locale } = $i18n

  async function customFetch<T = unknown, R extends ResponseType = 'json'>(
    url: string,
    options: CustomFetchOptions<R> = {}
  ): Promise<T> {
    const params = (options.params ?? {}) as QueryParams
    const cacheKey = options.withCache ? `${url}${transformToQueryString(params)}` : null

    const token = useCookie<string | null>('redirect_token')
    const runtimeConfig = useRuntimeConfig()

    const headers: HeadersInit = {
      'Accept-Language': locale.value || 'en',
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...(options.headers as HeadersInit | undefined)
    }

    try {
      if (cacheKey && responseCache.has(cacheKey)) {
        return responseCache.get(cacheKey) as T
      }
      // local typed signature for the runtime $fetch we use
      type NuxtFetch = <U = unknown, S extends ResponseType = 'json'>(
        url: string,
        opts?: FetchOptions<S>
      ) => Promise<U>

      // cast the runtime $fetch to the typed signature
      const $fetch = (nuxtApp as any).$fetch as unknown as NuxtFetch

      // now prepare options (still cast to FetchOptions<R> for safety)
      const ofetchOpts = options as FetchOptions<R>

      // merge and cast to the actual param type expected by your runtime (optional)
      const mergedOpts = {
        ...ofetchOpts,
        baseURL: runtimeConfig.public.BASE_URL,
        headers
      } as unknown as FetchOptions<R>

      // call with generics — no error
      const data = await $fetch<T, R>(url, mergedOpts)

      if (cacheKey) {
        responseCache.set(cacheKey, data as T)
      }

      return data as T
    } catch (e: unknown) {
      const err = e as FetchError
      // ofetch's FetchError may include a .response; read status/url defensively
      const status = (err as any)?.response?.status as number | undefined
      const resUrl = (err as any)?.response?.url as string | undefined

      if (typeof status === 'number' && resUrl) {
        const m: MinimalResponse = { status, url: resUrl }
        await handleUnauthenticated(m, locale.value, $router)
        await handleUnauthorized(m, locale.value, $router)
        await handleServerError(m, locale.value)
      }

      // preserve server-provided error payload when present
      throw (err as any)?.data ?? err
    }
  }

  // Expose
  nuxtApp.vueApp.config.globalProperties.$customFetch = customFetch
  nuxtApp.provide('customFetch', customFetch)
})
