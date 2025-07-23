import { ref, onMounted, onUnmounted } from 'vue'

export default function() {
  const breakpoint = ref('sm')

  const updateBreakpoint = () => {
    const width = window.innerWidth
    breakpoint.value = 
      width < 640 ? 'sm' : 
      width < 768 ? 'md' : 
      width < 1024 ? 'lg' : 
      width < 1280 ? 'xl' : '2xl'
  }

  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  return breakpoint
}