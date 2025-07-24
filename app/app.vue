<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const { locale, locales } = useI18n()
useHead({
  htmlAttrs: {
    dir: computed(() => locales.value.find((l) => l.code === locale.value)?.dir || 'ltr'),
    lang: computed(() => locale.value)
  }
})
</script>
