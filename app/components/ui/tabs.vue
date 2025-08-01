<template>
  <div
    ref="containerRef"
    :class="[
      'flex h-[68px] w-fit gap-[2px] rounded-3xl bg-[#F0F0F0] px-[14px] py-[13px] text-center text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black backdrop-blur-[10px] transition-all'
    ]"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      @click="() => onTabChange(tab)"
      :class="[
        'relative flex h-full items-center text-nowrap rounded-xl border-none px-[20px] capitalize',
        tab.value == modelValue?.value && 'bg-[#010101] text-white',
        btnClass
      ]"
    >
      <slot name="tab" :tab="tab" :isSelected="tab.value == modelValue?.value">
        {{ tab.label }}
      </slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: [Object, null], required: true },
  btnClass: { type: String }
})
const emits = defineEmits(['update:modelValue'])

const containerRef = ref(null)
const containerWidth = ref(0)
const onTabChange = (tab) => {
  emits('update:modelValue', tab)
}

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
    // console.log('Current container width:', containerWidth.value)
    // Use the width value here for any logic you need
  }
}

onMounted(() => {
  updateWidth()

  const resizeObserver = new ResizeObserver(updateWidth)
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  onBeforeUnmount(() => {
    resizeObserver.disconnect()
  })
})
defineExpose({
  containerWidth
})
</script>
