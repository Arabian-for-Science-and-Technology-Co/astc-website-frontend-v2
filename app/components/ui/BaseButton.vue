<template>
  <button
    :class="[
      'text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black',
      'w-full max-w-[275px] rounded-3xl bg-white py-[23px] transition-colors hover:bg-white/70',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  text: { type: Array, required: true },
  btnClass: { type: String }
})
</script>
