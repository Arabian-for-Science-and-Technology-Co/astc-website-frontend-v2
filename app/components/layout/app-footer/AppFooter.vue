<template>
  <div>
    <ProductsSection v-if="showProductsSection" class="pb-[calc(var(--footer-gap)/2)]" />
    <section
      :class="[
        'bg-white pb-[61px] pt-[calc(var(--footer-gap)/2)]',
        'lg:pb-[55px]',
        '3xl:pb-[64px]'
      ]"
    >
      <AppFooterSection1 />
      <AppFooterSection2 :pages="pages" class="pt-[110px] lg:pt-[102px] 3xl:pt-[104px]" />
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  showProductsSection: { type: Boolean, default: true }
})
const { locale } = useI18n()
const { settings } = useWebsiteSettings()

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
