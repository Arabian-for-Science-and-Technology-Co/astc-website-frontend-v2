<template>
  <section class="bg-white">
    <AppFooterSection1 />
    <AppFooterSection2 :pages="pages" />
  </section>
</template>

<script setup>
const pages = [
  'Products & Solutions',
  'News',
  'About',
  'Contact',
  'Privacy Policy',
  'Terms & Conditions'
]
</script>
<style scoped></style>
