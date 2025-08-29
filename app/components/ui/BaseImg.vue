<template>
  <NuxtImg
    class="content-transition"
    v-bind="$attrs"
    :src="resolvedSrc"
    @error="handleImageError"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  fallback?: string
  src?: string
}>()
const fallbackSrc = ref<string | null>(null)
function handleImageError() {
  fallbackSrc.value = props.fallback ?? ''
}
const resolvedSrc = computed(() => fallbackSrc.value || props.src)
</script>
