<template>
  <div />
</template>

<script setup lang="ts">
import { definePageMeta, useI18n, useWebsiteSettings } from '#imports'

definePageMeta({
  layout: 'blank',
  alias: ['/msa']
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const nuxtApp = useNuxtApp()
const { locale } = useI18n()
const { settings, fetchSettings } = useWebsiteSettings()

await fetchSettings()

const preferredKey = locale.value === 'ar' ? 'managed_services_ar' : 'managed_services_en'
const managedServicesUrl = settings.value?.[preferredKey] || settings.value?.['managed_services_en']

if (!managedServicesUrl) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Managed services document was not found.'
  })
}

await nuxtApp.runWithContext(() =>
  navigateTo(managedServicesUrl, {
    external: true,
    redirectCode: 302,
    replace: true
  })
)
</script>
