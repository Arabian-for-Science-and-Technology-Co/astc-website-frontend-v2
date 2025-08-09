<template>
  <teleport to="body">
    <Tabs
      v-bind="$attrs"
      :returnObject="false"
      ref="tabsRef"
      :class="[!isHovering && tabsClass]"
      :btnSelectedClass="!isHovering && selectedTabClass"
      :modelValue="route.path"
      @update:modelValue="
        (val) => {
          navigateTo(val)
          isHovering = false
        }
      "
      :tabs="tabs"
    >
      <template #tab="{ tab, isSelected }">
        <h2
          @mouseenter="
            !disableHoverOnTab && tab.id == 'products-and-solutions'
              ? (isHovering = true)
              : (isHovering = false)
          "
          :class="[!isSelected && 'hover:text-[#1778FF]']"
        >
          {{ tab.label }}
        </h2>
        <span
          v-if="tab.isNew"
          class="absolute end-[7px] top-[7px] h-2 w-2 rounded-full bg-[#0ADF0A]"
        >
        </span>
      </template>
    </Tabs>
    <div v-show="isHovering" class="fixed start-0 top-0 z-[50] flex h-[100vh] w-full flex-col">
      <div
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
        class="h-[90vh] max-h-[900px] overflow-y-auto bg-white"
      >
        <BaseAppHeader
          class="!static"
          :desktopMenuWidth="tabsRef?.containerWidth"
          :showLeftLogo="true"
        >
          <template #languageSwitcher>
            <LanguageSwitcher />
          </template>
        </BaseAppHeader>
        <ProductsSection class="!pb-[74px] !pt-[60px]" />
      </div>
      <div class="backdrop flex-1 bg-blue-900/40"></div>
    </div>
  </teleport>
</template>

<script setup>
const props = defineProps({
  tabs: { type: Array, required: true },
  tabsClass: { type: String, default: '' },
  selectedTabClass: { type: String, default: '' }
})
const tabsRef = ref(null)
const route = useRoute()

const isHovering = ref(false)
const disableHoverOnTab = ref(false)
watch(isHovering, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
let timeoutId = null

watch(
  route,
  () => {
    disableHoverOnTab.value = true
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      disableHoverOnTab.value = false
      timeoutId = null
    }, 1000)
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

defineExpose({
  width: computed(() => tabsRef.value?.containerWidth)
})
</script>
<style scoped></style>
