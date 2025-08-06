<template>
  <Tabs
    :tabs="availableLocales"
    :modelValue="selected"
    @update:model-value="setLocale($event.value)"
    v-bind="$attrs"
    :class="['gap-[8.35px]', tabsClass]"
    :btn-class="['!px-[10px]', btnClass]"
    :btnSelectedClass="selectedTabClass"
  />
</template>
<script setup>
const props = defineProps({
  btnClass: { type: String },
  tabsClass: { type: String, default: '' },
  selectedTabClass: { type: String, default: '' }
})
const { locale, locales, setLocale } = useI18n()
const mapped = {
  en: { label: 'Eng', value: 'en' },
  ar: { label: 'عربى', value: 'ar' }
}
const selected = computed(() => mapped[locale.value])
const availableLocales = computed(() => {
  return locales.value.map((i) => mapped[i.code])
})
</script>
