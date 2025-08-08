<template>
  <NuxtImg v-bind="$attrs" :src="resolvedSrc" @error="handleImageError" />
</template>

<script setup>
const props = defineProps({
  fallback: { type: String },
  src: { type: String, required: true }
})

const fallbackSrc = ref(null)
function handleImageError() {
  fallbackSrc.value = props.fallback
}
const resolvedSrc = computed(() => fallbackSrc.value || props.src)
</script>
