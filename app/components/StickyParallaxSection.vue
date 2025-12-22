<template>
  <section class="relative w-full overflow-hidden" ref="sectionRef">
    <!-- Background Image -->
    <div
      class="absolute inset-0 z-0 h-[120%] w-full -translate-y-[10%]"
      :style="{ transform: `translate3d(0, ${parallaxY}px, 0)` }"
    >
      <BaseImg
        v-if="bgImage"
        :src="bgImage"
        format="webp"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-[2000ms] will-change-transform hover:scale-105"
        alt="Parallax Background"
      />
      <video v-else-if="bgVideo" autoplay muted loop playsinline class="h-full w-full object-cover">
        <source :src="bgVideo" type="video/mp4" />
      </video>
      <!-- Overlay -->
      <div v-if="bgImage || bgVideo" class="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
    </div>

    <!-- Content -->
    <div
      ref="contentRef"
      class="relative z-10 flex h-full w-full flex-col justify-center transition-all duration-1000"
      :class="{ 'animate-in': isVisible, 'opacity-0': !isVisible }"
    >
      <template v-if="title">
        <h2
          class="mb-6 py-10 text-center text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mb-8 text-center text-xl font-light leading-relaxed text-white opacity-90 md:text-2xl"
        >
          {{ description }}
        </p>
      </template>

      <!-- Slot for dynamic components -->
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  bgImage?: string
  bgVideo?: string
  title?: string
  description?: string
}>()

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const parallaxY = ref(0)

let observer: IntersectionObserver | null = null
let rafId = 0

// Parallax calculation
const updateParallax = () => {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Calculate visibility progress: 0 (enter bottom) -> 1 (exit top)
  // We want to move the background slightly as we scroll.
  // When rect.top is at windowHeight, progress is start.
  // When rect.bottom is at 0, progress is end.

  // Simple optimization: only calculate if in view or close to it
  if (rect.top < windowHeight && rect.bottom > 0) {
    const speed = 0.2 // Adjust for stronger/weaker effect
    // Center point is when section center aligns with viewport center
    const distFromCenter = rect.top + rect.height / 2 - windowHeight / 2
    parallaxY.value = distFromCenter * speed
  }
}

const onScroll = () => {
  rafId = requestAnimationFrame(updateParallax)
}

onMounted(() => {
  if (contentRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(contentRef.value)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateParallax() // Initial call
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Initial state for content before animation */
.relative {
  transform: translateY(20px);
}

@media (prefers-reduced-motion: reduce) {
  .transition-transform,
  .transition-all,
  .will-change-transform,
  .animate-in {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }

  .hover\:scale-105:hover {
    transform: none !important;
  }
}
</style>
