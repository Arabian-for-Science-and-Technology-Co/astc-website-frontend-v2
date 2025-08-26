export const useProductsAndSolutions = () => {
  const productsAndSolutions = useState('productsAndSolutions', () => [])

  const fetchProductsAndSolutions = async () => {
    if (productsAndSolutions.value.length > 0) return
    const { apiFetch } = useApi()
    try {
      const { data } = await apiFetch('/website/home/products-and-solutions')
      productsAndSolutions.value = data || []
    } catch (error) {
      console.error('Failed to fetch productsAndSolutions:', error)
      productsAndSolutions.value = []
    }
  }
  return {
    productsAndSolutions,
    fetchProductsAndSolutions
  }
}
