<template>
  <div />
</template>

<script setup lang="ts">
import { definePageMeta, useCompanyProfileRedirect } from '#imports';

definePageMeta({
  layout: 'blank'
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

await useCompanyProfileRedirect('company_profile_en')
</script>
