<template>
  <section ref="sectionEl" class="relative h-screen w-screen overflow-hidden bg-[#0D1667]">
    <!-- Bottom image -->
    <img :src="sky1" alt="sky1" class="absolute inset-0 h-full w-full object-cover object-center" />

    <!-- Mask (fixed diagonal) -->
    <div
      ref="maskEl"
      class="clip-diagonal absolute inset-0 z-10 overflow-hidden will-change-transform"
    >
      <!-- Foreground image (moves opposite of mask by same amount) -->
      <img
        ref="fgImg"
        :src="sky2"
        alt="sky2"
        class="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import sky1 from '~/assets/images/main/sky_parallax_1.png?url'
import sky2 from '~/assets/images/main/sky_parallax_2.png?url'

const sectionEl = ref<HTMLElement | null>(null)
const maskEl = ref<HTMLElement | null>(null)
const fgImg = ref<HTMLElement | null>(null)

let raf = 0
let active = false
let baselineScroll = 0 // scrollY when section becomes visible
let effectDistancePx = 0 // how many px of scroll to finish the effect

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

const setTransforms = (shift: number) => {
  // mask goes LEFT by shift; image goes RIGHT by same shift
  maskEl.value!.style.transform = `translate3d(${-shift}px,0,0)`
  fgImg.value!.style.transform = `translate3d(${shift}px,0,0)`
}

const update = () => {
  if (!active || !sectionEl.value || !maskEl.value || !fgImg.value) {
    raf = 0
    return
  }
  const delta = (window.scrollY || 0) - baselineScroll
  const progress = clamp(delta / effectDistancePx, 0, 1)
  const shift = progress * sectionEl.value.clientWidth
  setTransforms(shift)
  raf = 0
}
const onScroll = () => {
  if (!raf) raf = requestAnimationFrame(update)
}

let obs: IntersectionObserver | null = null

onMounted(() => {
  // freeze at start pose
  if (maskEl.value && fgImg.value) {
    maskEl.value.style.transform = 'translate3d(0,0,0)'
    fgImg.value.style.transform = 'translate3d(0,0,0)'
  }

  const HEADER = 0 // px; set your sticky header height if you have one
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)

  const START = 0.98 // treat as "full view" (robust against rounding)
  const STOP = 0.0 // stop only when fully out of view

  const start = () => {
    active = true
    baselineScroll = window.scrollY || 0
    effectDistancePx = sectionEl.value!.clientWidth // how far to complete effect
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    if (!raf) raf = requestAnimationFrame(update) // paint
  }

  const stop = () => {
    active = false
    setTransforms(0) // keep start frame when offscreen
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  obs = new IntersectionObserver(
    (entries) => {
      const r = entries[0]?.intersectionRatio
      if (!active && r && r >= START) start()
      // don’t stop when it drops below START; keep running until it’s gone
      else if (active && r && r <= STOP) stop()
    },
    { threshold: thresholds, rootMargin: `-${HEADER}px 0px 0px 0px` }
  )

  obs.observe(sectionEl.value!)
})

onUnmounted(() => {
  if (obs && sectionEl.value) obs.unobserve(sectionEl.value)
  obs?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style scoped>
/* Left wedge with straight diagonal – adjust the two middle % to match your design */
.clip-diagonal {
  clip-path: polygon(0 0, 45% 0, 70% 100%, 0 100%);
  -webkit-clip-path: polygon(0 0, 45% 0, 70% 100%, 0 100%);
}
</style>
