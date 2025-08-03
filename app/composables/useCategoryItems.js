export const useCategoryItems = () => {
  const categoryItems = useState('categoryItems', () => [])

  const fetchCategoryItems = async () => {
    if (categoryItems.value.length > 0) return
    const { $customFetch } = useNuxtApp()
    try {
      const { data } = await $customFetch('website/home/categories/1/items')
      categoryItems.value = data || []
    } catch (error) {
      console.error('Failed to fetch categoryItems:', error)
      categoryItems.value = []
    }
  }
  return {
    categoryItems,
    fetchCategoryItems
  }
}
