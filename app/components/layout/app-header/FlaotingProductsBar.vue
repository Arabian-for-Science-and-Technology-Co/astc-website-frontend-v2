<template>
  <div class="fixed start-0 top-0 z-[40] flex h-[100vh] w-full flex-col">
    <div
      @mouseover="$emit('mouseover')"
      @mouseleave="$emit('mouseleave')"
      class="h-[90vh] max-h-[900px] bg-white"
    >
      <BaseAppHeader class="!static" :tabs="tabs" :showLeftLogo="true" :enableHover="false" />
      <ProductsSection />
    </div>
    <div class="backdrop flex-1 bg-blue-900/40"></div>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true }
})
const emits = defineEmits(['mouseover', 'mouseleave'])
</script>
