<template>
  <BaseAppHeader :tabs="tabs" :showLeftLogo="!isHomePage" />
</template>

<script setup>
const tabs = [
  { id: 'products_solutions', label: 'Products & Solutions', value: 'Products & Solutions' },
  { id: 'news', label: 'News', value: 'News', isNew: true },
  { id: 'about', label: 'About', value: 'About' },
  { id: 'contact', label: 'Contact', value: 'Contact' }
]
const route = useRoute()
const isHomePage = computed(() => route.path == '/')
</script>
