export const usePages = () => {
  const pages = useState('pages', () => [])

  const fetchPages = async () => {
    if (pages.value.length > 0) return
    const { $customFetch } = useNuxtApp()
    try {
      const { data } = await $customFetch('/website/home/page')
      pages.value = data || []
    } catch (error) {
      console.error('Failed to fetch pages:', error)
      pages.value = []
    }
  }
  const homePage = computed(() => pages.value.find((page) => page.slug == 'home') || {})
  return {
    pages,
    homePage,
    fetchPages
  }
}
