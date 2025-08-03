<template>
  <div class="fixed start-0 top-0 z-[40] flex h-[100vh] w-full flex-col">
    <div
      @mouseover="$emit('mouseover')"
      @mouseleave="$emit('mouseleave')"
      class="h-[90vh] max-h-[900px] overflow-y-auto bg-white"
    >
      <AppHeader class="!static" :showLeftLogo="true" :enableHover="false" />
      <ProductsSection class="!pb-[74px] !pt-[60px]" />
    </div>
    <div class="backdrop flex-1 bg-blue-900/40"></div>
  </div>
</template>

<script setup>
const emits = defineEmits(['mouseover', 'mouseleave'])
</script>
