<template>
  <div class="relative w-full" ref="containerRef">
    <!-- Scrollable Track -->
    <div
      ref="trackRef"
      :class="[
        'no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth',
        trackClass
      ]"
      @scroll.passive="onScroll"
      :dir="isRTL ? 'rtl' : 'ltr'"
    >
      <slot />
    </div>

    <!-- Prev Button -->
    <button
      v-if="showPrev"
      @click="scrollBy(-1)"
      :disabled="atStart"
      class="absolute start-0 top-1/2 z-10 hidden h-[80px] w-[80px] -translate-y-1/2 place-items-center rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition-colors hover:bg-white lg:grid"
    >
      <ArrowIcon ltrLeft />
    </button>

    <!-- Next Button -->
    <button
      v-if="showNext"
      @click="scrollBy(1)"
      :disabled="atEnd"
      class="absolute end-0 top-1/2 z-10 hidden h-[80px] w-[80px] -translate-y-1/2 place-items-center rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition-colors hover:bg-white lg:grid"
    >
      <span v-if="isLoading" class="animate-spin">⟳</span>
      <span v-else>
        <ArrowIcon ltrRight />
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// Props
const props = defineProps({
  loadMore: { type: Function, default: null },
  isLoading: { type: Boolean, default: false },
  debounceTime: { type: Number, default: 100 },
  trackClass: { type: String, default: '' }
})

// Refs
const trackRef = ref(null)
const containerRef = ref(null)
const scrollTimeout = ref(null)
const atStart = ref(true)
const atEnd = ref(false)
const showPrev = ref(false)
const showNext = ref(false)

// RTL detection
const { locale } = useI18n()
const isRTL = computed(() => locale.value === 'ar')

// Compute scroll amount (one-third of container)
const scrollAmount = () => (containerRef.value?.clientWidth || 0) / 3

// Scroll handler (debounced)
const onScroll = () => {
  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(checkEdges, props.debounceTime)
}

// Check whether we’re at start/end and if arrows should show
function checkEdges() {
  const el = trackRef.value
  if (!el) return

  const { scrollLeft, scrollWidth, clientWidth } = el
  const abs = Math.abs(scrollLeft)

  atStart.value = isRTL.value ? scrollLeft >= 0 : scrollLeft === 0
  atEnd.value = isRTL.value
    ? abs >= scrollWidth - clientWidth - 1
    : scrollLeft + clientWidth >= scrollWidth - 1

  // show arrows only if there's overflow
  showPrev.value = !atStart.value
  showNext.value = !atEnd.value

  // if reached end, trigger loadMore once
  if (!props.isLoading && atEnd.value && typeof props.loadMore === 'function') {
    props.loadMore()
  }
}

// Imperative scroll by pages
function scrollBy(direction = 1) {
  const el = trackRef.value
  if (!el) return
  const delta = scrollAmount() * direction * (isRTL.value ? -1 : 1)
  el.scrollBy({ left: delta, behavior: 'smooth' })
}

// on mount, check initial state
onMounted(() => {
  nextTick(() => {
    checkEdges()
    // watch for resizing (optional)
    window.addEventListener('resize', checkEdges)
  })
})

// cleanup
onUnmounted(() => {
  window.removeEventListener('resize', checkEdges)
  clearTimeout(scrollTimeout.value)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
