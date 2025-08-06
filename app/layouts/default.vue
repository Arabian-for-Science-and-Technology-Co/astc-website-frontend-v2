<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden whitespace-pre-line bg-white font-zarid">
    <AppHeader
      :showLeftLogo="showLeftLogo"
      :isWhiteLogo="isWhiteLogo"
      :tabsClass="tabsClass"
      :selectedTabClass="selectedTabClass"
    />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter :showProductsSection="showProductsSection" />
  </div>
</template>

<script setup>
const props = defineProps({
  showProductsSection: { type: Boolean, default: true },
  showLeftLogo: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false },
  tabsClass: { type: String, default: '!bg-white' },
  selectedTabClass: { type: String, default: '' }
})
const { fetchSettings } = useWebsiteSettings()
const { fetchPages } = usePages()
await fetchSettings()
await fetchPages()
</script>
