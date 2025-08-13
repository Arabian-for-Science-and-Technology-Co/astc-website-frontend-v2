<template>
  <NuxtLayout>
    <Toaster
      position="top-right"
      rich-colors
      :toastOptions="{
        class: head.htmlAttrs.dir === 'rtl' ? 'font-arabic' : 'font-zarid',
        descriptionClass: head.htmlAttrs.dir === 'rtl' ? 'font-arabic' : 'font-zarid'
      }"
    />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const config = useRuntimeConfig()
const baseUrl = config.public.siteUrl || 'https://astc.com.sa/astc/'
const { locale } = useI18n()
const head = useLocaleHead({ addDirAttribute: true, addSeoAttributes: true })
const { settings, fetchSettings } = useWebsiteSettings()

await fetchSettings()
const staticMetaData = computed(() => ({
  title: settings?.value?.[`meta_title_${locale.value}`] || 'ASTC',
  description:
    settings?.value?.[`meta_description_${locale.value}`] ||
    'ASTC has been a trusted contractor in Saudi Arabia since 2007, delivering expert-level Project Management, Telecom Engineering, and IT services.',
  type: 'website',
  image: settings.value?.favicon || `${baseUrl}/favicon.ico`,
  url: `${baseUrl}/astc/`,
  keywords:
    settings?.value?.[`keywords_${locale.value}`] ||
    'ASTC, Arabian for Science and Technology Co., Saudi contractor, project management, telecom, IT services',
  author: 'ASTC'
}))

useHead({
  title: () => staticMetaData.value.title,
  meta: () => [
    { hid: 'charset', name: 'charset', content: 'utf-8' },
    {
      hid: 'description',
      name: 'description',
      content: staticMetaData.value.description
    },
    {
      hid: 'author',
      name: 'author',
      content: staticMetaData.value.author
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: staticMetaData.value.keywords
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: staticMetaData.value.title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: staticMetaData.value.description
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: staticMetaData.value.type
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: staticMetaData.value.image
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: staticMetaData.value.url
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: staticMetaData.value.title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: staticMetaData.value.description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: staticMetaData.value.image
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: staticMetaData.value.url
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: settings.value?.favicon || '/favicon.ico'
    }
  ]
})
</script>
