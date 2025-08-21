<template>
  <div
    ref="listContainer"
    class="list-slider-container scrollbar-hide flex overflow-x-auto"
    :style="{ gap: spaceBetween + 'px' }"
  >
    <div
      v-for="(item, index) in items"
      :key="`list-${index}`"
      class="shrink-0"
    >
      <slot name="item" :item="item" :index="index" :isActive="activeIndex === index" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, defineExpose } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  spaceBetween: {
    type: Number,
    default: 22
  }
})

const listContainer = ref(null)
const activeIndex = ref(0)

function scrollToActive(index = 0) {
  activeIndex.value = index
  nextTick(() => {
    const container = listContainer.value
    if (!container) return

    const listElements = Array.from(container.children)
    if (listElements.length <= index) return

    const activeEl = listElements[index]

    const containerRect = container.getBoundingClientRect()
    const itemRect = activeEl.getBoundingClientRect()

    const scrollLeft = itemRect.left - containerRect.left + container.scrollLeft
    const center = scrollLeft - container.clientWidth / 2 + itemRect.width / 2

    container.scrollTo({ left: center, behavior: 'smooth' })
  })
}

defineExpose({ scrollToActive })
</script>

<style scoped>
.list-slider-container.scrollbar-hide {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.list-slider-container.scrollbar-hide::-webkit-scrollbar { display: none; }
.list-slider-container.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
