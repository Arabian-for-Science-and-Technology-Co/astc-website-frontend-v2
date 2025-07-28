<template>
  <section
    :class="[
      'app-container absolute z-40 flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
      'pt-[38px]'
    ]"
  >
    <article class="flex items-center gap-[30px]">
      <VisionLogoIcon />
      <h3 class="text-xl font-normal not-italic leading-[100%] tracking-[0.2px] text-[#A9AEB8]">
        Every Saudi must get involved
        <br />
        for a better future
      </h3>
    </article>
    <ClientOnly>
      <article class="flex items-center gap-[40px]">
        <LanguageSwitcher />
        <div :style="{ width: tabsRef?.containerWidth + 'px' }"></div>
        <Tabs ref="tabsRef" class="fixed end-[--container-ps]" v-model="selected" :tabs="tabs" />
      </article>
    </ClientOnly>
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

const tabsRef = ref(null)
</script>
