export const usePages = () => {
  const pages = useState('pages', () => [])
  const { apiFetch } = useApi()

  const fetchPages = async () => {
    if (pages.value.length > 0) return
    try {
      const { data } = await apiFetch('/website/home/page')
      pages.value = data || []
    } catch (error) {
      console.error('Failed to fetch pages:', error)
      pages.value = []
    }
  }
  const getPage = (pageSlug) => pages.value.find((page) => page.slug == pageSlug) || {}
  return {
    pages,
    fetchPages,
    getPage
  }
}
