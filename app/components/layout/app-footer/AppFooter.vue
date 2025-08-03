<template>
  <section
    :class="['bg-white pb-[61px] pt-[calc(var(--footer-gap)/2)]', 'lg:pb-[55px]', '3xl:pb-[64px]']"
  >
    <AppFooterSection1 />
    <AppFooterSection2 :pages="pages" class="pt-[110px] lg:pt-[102px] 3xl:pt-[104px]" />
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
