// composables/useBreakpoint.js
import { ref, onMounted, onUnmounted } from 'vue'

export default function useBreakpoints() {
  const breakpoint = ref('sm')
  const order = ['sm', 'md', 'lg', 'xl', '2xl']

  const update = () => {
    const w = window.innerWidth
    if (w >= 1536) {
      breakpoint.value = '2xl'
    } else if (w >= 1280) {
      breakpoint.value = 'xl'
    } else if (w >= 1024) {
      breakpoint.value = 'lg'
    } else if (w >= 768) {
      breakpoint.value = 'md'
    } else {
      breakpoint.value = 'sm'
    }
  }

  if (typeof window !== 'undefined') update()
  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  function gte(name) {
    return order.indexOf(breakpoint.value) >= order.indexOf(name)
  }
  function lte(name) {
    return order.indexOf(breakpoint.value) <= order.indexOf(name)
  }

  return { breakpoint, gte, lte }
}
