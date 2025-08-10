<template>
  <section
    ref="container"
    class="relative flex h-screen items-stretch overflow-hidden bg-[#0D1667] font-zarid"
  >
    <BaseImg
      format="webp"
      :src="sectionData?.image || sky_parallax_1"
      class="h-full flex-1 object-cover"
      :alt="`sky_parallax_1`"
      :fallback="sky_parallax_1"
    />
    <ClientOnly>
      <img
        ref="sky2"
        :src="sky_parallax_2"
        class="absolute inset-0 h-full w-full object-cover"
        :style="{ clipPath }"
        :alt="`sky_parallax_2`"
      />
    </ClientOnly>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
const sky_parallax_1 = '/Images/main/sky_parallax_1.png'
import sky_parallax_2 from '~/assets/images/main/sky_parallax_2.png?url'
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})

// ——— Configurable start / end polygons ———
// “x y, x y, x y, x y” (percent values, without the “%” or “polygon()”)

const { gte } = useBreakpoints()

const start = computed(() => {
  if (gte('2xl')) return '0 0, 68 0, 92 100, 0 100'
  if (gte('lg')) return '0 0, 69 0, 100 100, 0 100'
  return '0 0, 81 0, 100 100, 0 100'
})

const end = ref('0 0, 0 0, 28 100, 0 100')
// parse a “’x y, x y, …’” string into an array [[x,y],…]
function parsePoints(str) {
  return str.split(',').map((pair) => pair.trim().split(/\s+/).map(Number))
}

// reactive arrays of points
const startPts = computed(() => parsePoints(start.value))
const endPts = computed(() => parsePoints(end.value))

// refs & reactive clipPath CSS
const container = ref(null)
const clipPath = ref(`polygon(${start.value}%)`)

// simple linear interpolation
const lerp = (a, b, t) => a + (b - a) * t

function updateClip() {
  if (!container.value) return
  const { top, height } = container.value.getBoundingClientRect()
  const progress = Math.min(
    Math.max((window.innerHeight - top) / (window.innerHeight + height), 0),
    1
  )

  // build an array of interpolated points
  const pts = startPts.value.map((from, i) => {
    const to = endPts.value[i]
    const x = lerp(from[0], to[0], progress)
    const y = lerp(from[1], to[1], progress)
    return `${x}% ${y}%`
  })

  clipPath.value = `polygon(${pts.join(', ')})`
}

onMounted(() => {
  window.addEventListener('scroll', updateClip, { passive: true })
  updateClip()
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateClip)
})
</script>

<style>
/* very slight smoothing between frames */
img[ref='sky2'] {
  transition: clip-path 0.08s linear;
}
</style>
