<template>
  <article class="prose max-w-none">
    <!-- adjust depending on your backend payload -->
    <h1>{{ slug }}</h1>
  </article>
</template>

<script setup>
throw navigateTo('/', { redirectCode: 307, replace: true })
const route = useRoute()
const { locale } = useI18n()
const slug = computed(() =>
  Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug)
)
</script>
