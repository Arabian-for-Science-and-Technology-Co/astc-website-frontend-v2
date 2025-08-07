import { defineNuxtPlugin } from '#app'
// import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const {
    // $toast,
    // $swal,
    //
    $router,
    $i18n
  } = nuxtApp
  const { locale } = $i18n
  const transformToQueryString = (obj = {}) => {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => value)
    const queryString = new URLSearchParams(filteredEntries).toString()
    return queryString ? `?${queryString}` : ''
  }

  const handleUnAuthunticated = async (response) => {
    // const authStore = useAuthStore()

    if (response.status === 401 && response.url.includes('/auth/logout')) {
      const message = locale.value === 'en' ? 'You have been logged out' : 'تم تسجيل الخروج'

      // $toast.success(message)
      // authStore.clearStorage()
      return $router.push('/authentication/login')
    }

    if (
      response.status === 401 &&
      !response.url.includes('/auth/login') &&
      !response.url.includes('/auth/logout')
      // && authStore.user
    ) {
      // await $swal.fire({
      //   title: $i18n.t('alerts.logout.title'),
      //   text: $i18n.t('alerts.logout.text'),
      //   icon: 'warning',
      //   showCancelButton: false,
      //   confirmButtonText: $i18n.t('form.ok')
      // })

      // authStore.logOut()
      return
    }
  }

  const handleUnAuthorized = async (response) => {
    if (response.status === 403) {
      const message =
        locale.value === 'en'
          ? "You don't have permission to access this page"
          : 'ليس لديك الصلاحية للوصول إلى هذه الصفحة'

      // $toast.success(message)
      return $router.push('/')
    }
  }

  const serverError = async (response) => {
    if (response.status === 500) {
      const message = locale.value === 'en' ? 'Server error' : 'خطأ في الخادم'
      // Handle server errors as needed
    }
  }

  const useCustomeFetch = async (url, options = {}) => {
    const cacheResponse = new Map()
    const cacheKey = options?.withCache ? `${url}${transformToQueryString(options.params)}` : null

    const redirect_token = useCookie('redirect_token')
    const runtimeConfig = useRuntimeConfig()

    const headers = {
      'Accept-Language': locale.value || 'en',
      ...(redirect_token.value ? { Authorization: `Bearer ${redirect_token.value}` } : {}),
      ...options.headers
    }

    try {
      if (cacheKey && cacheResponse.has(cacheKey)) {
        return cacheResponse.get(cacheKey)
      }

      const response = await $fetch.raw(url, {
        ...options,
        baseURL: runtimeConfig.public.BASE_URL,
        headers
      })

      if (cacheKey) {
        cacheResponse.set(cacheKey, response._data)
      }

      return response._data
    } catch (error) {
      if (error.response) {
        await handleUnAuthunticated(error.response)
        await handleUnAuthorized(error.response)
        await serverError(error.response)
      }
      throw error.data || error
    }
  }

  nuxtApp.provide('customFetch', useCustomeFetch)
})
