import type { MaybeRefOrGetter } from 'vue'

export default function useCustomHead(
  metadata: MaybeRefOrGetter<{
    title: string
    description: string
    author: string
    keywords: string
    type: string
    image: string
    url: string
  }>
) {
  const metaRef = toRef(metadata)
  return useHead({
    title: () => metaRef.value.title,
    meta: () => [
      { hid: 'charset', name: 'charset', content: 'utf-8' },
      {
        hid: 'description',
        name: 'description',
        content: metaRef.value.description
      },
      {
        hid: 'author',
        name: 'author',
        content: metaRef.value.author
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: metaRef.value.keywords
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: metaRef.value.title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: metaRef.value.description
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: metaRef.value.type
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: metaRef.value.image
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: metaRef.value.url
      }
    ]
  })
}
