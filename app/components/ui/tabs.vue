<template>
  <div
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
        tab.value == modelValue?.value && 'bg-[#010101] text-white'
      ]"
    >
      {{ tab.label }}
      <span v-if="tab.isNew" class="absolute end-[7px] top-[7px] h-2 w-2 rounded-full bg-[#0ADF0A]"> </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: [Object, null], required: true }
})
const emits = defineEmits(['update:modelValue'])

const onTabChange = (tab) => {
  emits('update:modelValue', tab)
}

// const route = useRoute()
// const router = useRouter()
</script>

<style lang="scss" scoped></style>
