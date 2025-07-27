<template>
  <section
    :class="[
      'app-container fixed top-[0px] z-40 flex h-fit w-full items-center justify-between transition-colors duration-300',
      hasScrolled ? 'bg-white py-[20px] shadow-md' : 'bg-transparent pt-[38px]'
    ]"
  >
    <article v-if="!hasScrolled" class="flex items-center gap-[30px]">
      <VisionLogoIcon />
      <h3
        class=" text-xl font-normal not-italic leading-[100%] tracking-[0.2px] text-[#A9AEB8]"
      >
        Every Saudi must get involved
        <br />
        for a better future
      </h3>
    </article>

    <article class="ms-auto flex items-center gap-[40px]">
      <LanguageSwitcher v-if="!hasScrolled" />
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

const hasScrolled = ref(false)

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
