<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  alias: ['/msa_a']
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const nuxtApp = useNuxtApp()
const { settings, fetchSettings } = useWebsiteSettings()

await fetchSettings()

const managedServicesUrl = settings.value?.managed_services_ar

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
