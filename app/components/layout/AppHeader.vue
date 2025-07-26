<template>
  <section class="app-container z-40 bg-transparent h-fit w-full top-[38px] fixed flex items-center justify-between">
    <article class="flex items-center gap-[30px]">
      <VisionLogoIcon />
      <h3 class="text-[#A9AEB8] text-xl max-w-[210px] not-italic font-normal leading-[100%] tracking-[0.2px]">
        Every Saudi must get involved
        <!-- <br /> -->
        for a better future
      </h3>
    </article>
    <article class="flex items-center gap-[40px]">
      <LanguageSwitcher />
      <Tabs v-model="selected" :tabs="tabs" />
    </article>
  </section>
</template>

<script setup>
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
const tabs = [
  { label: 'Products & Solutions', value: 'Products & Solutions' },
  { label: 'News', value: 'News', isNew: true },
  { label: 'About', value: 'About' },
  { label: 'Contact', value: 'Contact' }
]
const selected = ref(null)
watch(selected, () => {
  console.log('selected', selected.value)
})
</script>
