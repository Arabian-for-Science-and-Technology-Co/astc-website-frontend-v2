<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden bg-white font-zarid">
    <AppHeader :showLeftLogo="!isHomePage" />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter :showProductsSection="!isProductsPage" />
  </div>
</template>

<script setup>
const route = useRoute()
const isHomePage = computed(() => route.path == '/')
const isProductsPage = computed(() => route.path == '/products')
</script>
