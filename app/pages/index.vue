<template>
  <div class="mb-[400px]">
    <HeroSection />
    <NewsSection />
    <AnnouncementSection />

    <PromoSection />
    <CustomersSection />
    <ParallaxSection />
    <PartnersSection />
    <SaudiVisionSection />
    <ProductsSection />
    
  </div>
</template>

<script setup>
const { $customFetch } = useNuxtApp()
const fetchData = async () => {
  try {
    const data = await $customFetch('pokemon/ditto', {
      method: 'GET'
      // body: { test: 123 },
      // withCache: true
    })
    console.log(data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
onMounted(() => {
  fetchData()
})
</script>
