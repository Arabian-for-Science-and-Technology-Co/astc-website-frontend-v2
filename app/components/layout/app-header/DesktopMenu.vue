<template>
  <teleport to="body">
    <Tabs
      v-bind="$attrs"
      :returnObject="false"
      ref="tabsRef"
      :class="[!enableHover && '!z-[-50] opacity-0']"
      :modelValue="route.path"
      @update:modelValue="(val) => navigateTo(val)"
      :tabs="tabs"
    >
      <template #tab="{ tab, isSelected }">
        <h2
          @mouseenter="
            enableHover && tab.id == 'products-and-solutions'
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
    <div v-if="isHovering" class="fixed start-0 top-0 z-[50] flex h-[100vh] w-full flex-col">
      <div
        @mouseover="enableHover ? (isHovering = true) : ''"
        @mouseleave="enableHover ? (isHovering = false) : ''"
        class="h-[90vh] max-h-[900px] overflow-y-auto bg-white"
      >
        <AppHeader class="!static" :showLeftLogo="true" :enableHover="false" />
        <ProductsSection class="!pb-[74px] !pt-[60px]" />
      </div>
      <div class="backdrop flex-1 bg-blue-900/40"></div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true },
  enableHover: { type: Boolean, default: true }
})
const tabsRef = ref(null)
const route = useRoute()
const isHovering = ref(false)
watch(isHovering, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
watch(
  route,
  () => {
    isHovering.value = false
  },
  { deep: true }
)

defineExpose({
  width: computed(() => tabsRef.value?.containerWidth)
})
</script>
<style scoped></style>
