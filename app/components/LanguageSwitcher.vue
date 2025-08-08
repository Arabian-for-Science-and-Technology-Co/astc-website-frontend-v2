<template>
  <ClientOnly>
    <Tabs
      :tabs="availableLocales"
      :modelValue="mapped[locale]"
      @update:model-value="switchLocale"
      v-bind="$attrs"
      :class="['gap-[8.35px]', tabsClass]"
      :btn-class="['!px-[10px]', btnClass]"
      :btnSelectedClass="selectedTabClass"
    />
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  btnClass: { type: [String, Array, Boolean, null] },
  tabsClass: { type: [String, Array, Boolean, null], default: '' },
  selectedTabClass: { type: [String, Array, Boolean, null], default: '' }
})

const { locale, locales, setLocale } = useI18n()
const isTransitioning = ref(false)
const transitionDirection = ref('fade')

const mapped = {
  en: { label: 'Eng', value: 'en' },
  ar: { label: 'عربى', value: 'ar' }
}

const availableLocales = computed(() => {
  return locales.value.map((i) => mapped[i.code])
})

const switchLocale = async (newLocale) => {
  if (newLocale.value === locale.value) return
  const currentLocaleIndex = availableLocales.value.findIndex((l) => l.value === locale.value)
  const newLocaleIndex = availableLocales.value.findIndex((l) => l.value === newLocale.value)
  transitionDirection.value = newLocaleIndex > currentLocaleIndex ? 'slide-left' : 'slide-right'
  isTransitioning.value = true
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await setLocale(newLocale.value)
  isTransitioning.value = false
}

useHead({
  htmlAttrs: {
    dir: computed(() => locales.value.find((l) => l.code === locale.value)?.dir || 'ltr'),
    lang: computed(() => locale.value),
    class: computed(() => (isTransitioning.value ? 'transition-active' : ''))
  }
})
</script>
