<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden whitespace-pre-line bg-white font-zarid">
    <AppHeader
      :showLeftLogo="layoutProps?.showLeftLogo ?? true"
      :isWhiteLogo="layoutProps?.isWhiteLogo ?? false"
      :tabsClass="layoutProps?.tabsClass ?? '!bg-white'"
      :selectedTabClass="layoutProps?.selectedTabClass ?? ''"
    />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter :showProductsSection="layoutProps?.showProductsSection ?? true" />
  </div>
</template>

<script setup>
const route = useRoute()
const layoutProps = computed(() => route.meta.layoutProps ?? {})

const { fetchSettings } = useWebsiteSettings()
const { fetchPages } = usePages()
await fetchSettings()
await fetchPages()
</script>
