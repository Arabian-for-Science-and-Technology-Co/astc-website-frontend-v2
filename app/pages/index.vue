<template>
  <div class="">
    <HeroSection />
    <component
      v-for="section in sections"
      :key="section.id"
      :is="componentMap[section.code] || null"
      :section-data="section"
    />
  </div>
</template>

<script setup>
// import HeroSection from '~/components/sections/hero-section/HeroSection.vue'
import NewsSection from '~/components/sections/NewsSection.vue'
import AnnouncementSection from '~/components/sections/AnnouncementSection.vue'
import PromoSection from '~/components/sections/PromoSection.vue'
import CustomersSection from '~/components/sections/CustomersSection.vue'
import ParallaxSection from '~/components/sections/ParallaxSection.vue'
import PartnersSection from '~/components/sections/PartnersSection.vue'
import SaudiVisionSection from '~/components/sections/SaudiVisionSection.vue'
// import ProductsSection from '~/components/sections/ProductsSection.vue'

const { $customFetch } = useNuxtApp()
const componentMap = {
  // hero_tiles: HeroSection,
  'latest-news': NewsSection,
  'contributing-to-the-saudi-future-with-delivering-fully-local-technologies': AnnouncementSection,
  'custom-development': PromoSection,
  'among-our-customers-': CustomersSection,
  'section-wwnWfA': ParallaxSection,
  'astc-is-a-trusted-partner-of-': PartnersSection,
  'saudi-vision-2030': SaudiVisionSection
  // 'products-solutions': ProductsSection
}
const { data: sections } = await useAsyncData(() => $customFetch('/website/home/page/1/sections'), {
  transform: (res) => res.data || []
})

onMounted(() => {
  console.log('sections', sections.value)
})
</script>
