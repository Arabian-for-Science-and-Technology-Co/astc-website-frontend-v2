<template>
  <BaseAppHeader
    :showLeftLogo="showLeftLogo"
    :isWhiteLogo="isWhiteLogo"
    :tabs="tabs"
    :desktopMenuWidth="desktopMenuRef?.width"
  >
    <template #languageSwitcher>
      <LanguageSwitcher :tabsClass="tabsClass" :selectedTabClass="selectedTabClass" />
    </template>
    <template #desktopMenu>
      <DesktopMenu
        :dir="'ltr'"
        ref="desktopMenuRef"
        class="fixed end-[--container-pe] top-[--header-pt] z-[60] hidden lg:flex"
        :tabs="tabs"
        :tabsClass="tabsClass"
        :selectedTabClass="selectedTabClass"
    /></template>
  </BaseAppHeader>
</template>

<script setup>
const props = defineProps({
  showLeftLogo: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false },
  tabsClass: { type: String, default: '' },
  selectedTabClass: { type: String, default: '' }
})
const desktopMenuRef = ref(null)
const { pages } = usePages()
const route = useRoute()
const { locale } = useI18n()
const tabs = computed(() =>
  pages.value
    .filter((page) => page.slug != 'home')
    .map((page) => ({
      id: page.slug,
      label: page?.[`title_${locale.value}`],
      value: `/${page.slug}`,
      isNew: page.slug == 'news' && route.path != '/news'
    }))
)
</script>
