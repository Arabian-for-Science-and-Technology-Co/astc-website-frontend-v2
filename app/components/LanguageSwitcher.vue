<template>
  <Tabs
    class="gap-[8.35px]"
    btn-class="!px-[10px]"
    :tabs="availableLocales"
    :modelValue="selected"
    @update:model-value="setLocale($event.value)"
  />
</template>
<script setup>
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
