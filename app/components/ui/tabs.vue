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
      @click="() => onTabChange(returnObject ? tab : isObject(tab) ? tab?.[valueKey] : tab)"
      :class="[
        'relative flex h-full items-center text-nowrap rounded-xl border-none px-[20px] capitalize',
        isTabSelected(tab) && (btnSelectedClass || 'bg-[#010101] text-white'),
        btnClass
      ]"
    >
      <slot name="tab" :tab="tab" :isSelected="isTabSelected(tab)">
        {{ isObject(tab) ? tab.label : tab }}
      </slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: [Object, null], required: true },
  btnClass: { type: String },
  btnSelectedClass: { type: String },
  returnObject: { type: Boolean, default: true },
  valueKey: { type: String, default: 'value' }
})
const emits = defineEmits(['update:modelValue'])
const isObject = (d) => typeof d == 'object' && Object.keys(d).length
const containerRef = ref(null)
const containerWidth = ref(0)
const onTabChange = (val) => {
  emits('update:modelValue', val)
}
const isTabSelected = (tab) => {
  return props.returnObject
    ? tab?.[props.valueKey] == props.modelValue?.[props.valueKey]
    : (isObject(tab) ? tab?.[props.valueKey] : tab) == props.modelValue
}

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
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
