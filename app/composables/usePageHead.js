export default function usePageHead(pageSlug) {
  const route = useRoute()
  const formattedPageSlug = pageSlug || (route.name == 'index' ? 'home' : route.name)
  const { locale } = useI18n()
  const { getPage } = usePages()
  const PageInfo = getPage(formattedPageSlug)
  useCustomHead(() => ({
    title: PageInfo?.[`meta_title_${locale.value}`],
    description: PageInfo?.[`meta_description_${locale.value}`],
    keywords: PageInfo?.[`meta_keywords_${locale.value}`]
  }))
}
