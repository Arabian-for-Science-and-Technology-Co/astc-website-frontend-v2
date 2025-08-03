const resData = {
  id: 1,
  title_ar: 'الشركة العربية للعلوم والتقنية',
  title_en: 'Arabian for Science and Technology Co',
  description_ar: 'الشركة العربية للعلوم والتقنية\nنُبدع محليًا. ونُؤثر عالميًا.',
  description_en: 'Arabian for Science and Technology Co.\nInnovate Local. Impact Global.',
  keywords_ar: 'موقع, عربي, تجريبي',
  keywords_en: 'website, demo, example',
  logo_url_ar: 'setting/logo.png',
  logo_url_en: 'setting/logo.png',
  favicon_url: null,
  mail: 'info@astc.com.sa',
  url: 'https://astc.com,sa',
  social_links: {
    twitter: 'https://twitter.com/example',
    facebook: 'https://facebook.com/example',
    instagram: 'https://instagram.com/example'
  },
  phones: ['+966 114 544 158', '+966 555 266 670'],
  address_en: '8101 Othman Bin Affan Street,Riyadh, Saudi Arabia',
  address_ar: '٨١٠١ شارع عثمان بن عفان، الرياض، المملكة العربية السعودية',
  location: '30.0444, 31.2357',
  created_at: '2025-06-24T07:43:15.000000Z',
  updated_at: '2025-06-24T07:43:15.000000Z'
}

export const useWebsiteSettings = () => {
  const settings = useState('websiteSettings', () => ({}))

  const fetchSettings = async () => {
    if (Object.keys(settings.value).length > 0) return
    const { $customFetch } = useNuxtApp()
    try {
      const { data } = await $customFetch('/website/general/setting')
      settings.value = data || {}
    } catch (error) {
      console.error('Failed to fetch website settings:', error)
      settings.value = { ...resData }
    }
  }

  return {
    settings,
    fetchSettings
  }
}
