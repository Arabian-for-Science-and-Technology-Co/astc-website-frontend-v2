<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const nuxtApp = useNuxtApp()
const { settings, fetchSettings } = useWebsiteSettings()

await fetchSettings()

const profileUrl = settings.value?.company_profile_en

if (!profileUrl) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Company profile was not found.'
  })
}

await nuxtApp.runWithContext(() =>
  navigateTo(profileUrl, {
    external: true,
    redirectCode: 302,
    replace: true
  })
)
</script>
