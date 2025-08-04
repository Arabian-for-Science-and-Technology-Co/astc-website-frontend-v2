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
  'news_bar': NewsSection,
  'vision': AnnouncementSection,
  'custom_development': PromoSection,
  'trusted_customers': CustomersSection,
  'digital_cloud': ParallaxSection,
  'trusted_partners': PartnersSection,
  'vision2030': SaudiVisionSection
  // 'products-solutions': ProductsSection
}
const { data: sections } = await useAsyncData(() => $customFetch('/website/home/page/1/sections'), {
  transform: (res) => res.data || []
})

onMounted(() => {
  console.log('sections', sections.value)
})
</script>
