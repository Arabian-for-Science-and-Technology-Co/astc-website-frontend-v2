<template>
  <div class="bg-gray-800">BaseMap</div>
</template>

<script setup>
const props = defineProps({
  text: { type: Array, required: true },
  btnClass: { type: String }
})
</script>
