export const useWebsiteSettings = () => {
  const settings = useState('websiteSettings', () => ({}))
  const customFetch = useCustomFetch()

  const fetchSettings = async () => {
    if (Object.keys(settings.value).length > 0) return
    try {
      const { data } = await customFetch('/website/general/setting')
      settings.value = data || {}
    } catch (error) {
      console.error('Failed to fetch website settings:', error)
      settings.value = {}
    }
  }

  return {
    settings,
    fetchSettings
  }
}
