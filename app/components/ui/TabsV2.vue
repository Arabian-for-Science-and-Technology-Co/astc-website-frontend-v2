<template>
  <div
    :class="[
      'flex h-[68px] w-fit gap-[42px] rounded-3xl bg-[#F0F0F0] px-[34px] py-[13px] text-center text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black backdrop-blur-[10px] transition-all'
    ]"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      @click="() => onTabChange(tab)"
      :class="[
        'relative flex h-full items-center text-nowrap rounded-xl border-none capitalize',
        tab.value == modelValue?.value && 'text-white'
      ]"
    >
      {{ tab.label }}
      <span
        v-if="tab.isNew"
        class="absolute -end-[12px] top-[7px] z-10 h-2 w-2 rounded-full bg-[#0ADF0A]"
      >
      </span>
      <span
        :class="[
          'absolute left-1/2 top-1/2 -z-10 h-full w-[calc(100%+40px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#010101] opacity-0 transition-all',
          tab.value == modelValue?.value && 'opacity-100'
        ]"
      ></span>
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
