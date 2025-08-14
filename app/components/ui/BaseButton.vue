<template>
  <button
    :class="[
      'relative',
      isStyled &&
        'text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black',
      isStyled &&
        'w-full max-w-[275px] rounded-3xl bg-white py-[23px] transition-colors hover:bg-white/70',
      $attrs.class
    ]"
  >
    <slot></slot>
    <span v-if="isLoading" class="absolute z-30 end-[12%] top-1/2 -translate-y-1/2">
      <LoadarIcon v-bind="loadarProps" />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  btnClass: { type: [String, Array, Boolean, null] },
  isStyled: { type: [Boolean, null], default: true },
  isLoading: { type: [Boolean, null], default: false },
  loadarProps: { type: Object, default: () => ({}) }
})
</script>
