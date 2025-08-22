export default function usePageHead(pageSlug = 'home') {
  const route = useRoute()
  // console.log('route', route)
  const { locale } = useI18n()
  const { getPage } = usePages()
  const PageInfo = getPage(pageSlug)
  useCustomHead(() => ({
    title: PageInfo?.[`meta_title_${locale.value}`],
    description: PageInfo?.[`meta_description_${locale.value}`],
    keywords: PageInfo?.[`meta_keywords_${locale.value}`]
  }))
}
