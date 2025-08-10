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
import NewsSection from '~/components/sections/NewsSection.vue'
import AnnouncementSection from '~/components/sections/AnnouncementSection.vue'
import PromoSection from '~/components/sections/PromoSection.vue'
import CustomersSection from '~/components/sections/CustomersSection.vue'
import ParallaxSection from '~/components/sections/parallax-section/ParallaxSection.vue'
import PartnersSection from '~/components/sections/PartnersSection.vue'
import SaudiVisionSection from '~/components/sections/SaudiVisionSection.vue'
definePageMeta({
  layoutProps: {
    showLeftLogo: false,
    tabsClass: null
  }
})

const { locale } = useI18n()
const { getPage } = usePages()
const homePage = getPage('home')
usePageHead(() => ({
  title: homePage?.[`meta_title_${locale.value}`],
  description: homePage?.[`meta_description_${locale.value}`],
  keywords: homePage?.[`meta_keywords_${locale.value}`]
}))

const customFetch = useCustomFetch()
const componentMap = {
  news_bar: NewsSection,
  vision: AnnouncementSection,
  custom_development: PromoSection,
  trusted_customers: CustomersSection,
  digital_cloud: ParallaxSection,
  trusted_partners: PartnersSection,
  vision2030: SaudiVisionSection
}
const { data: sections } = await useAsyncData(() => customFetch('/website/home/page/1/sections'), {
  transform: (res) => res.data || []
})
</script>
