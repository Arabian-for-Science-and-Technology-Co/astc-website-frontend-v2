<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const { locale, locales } = useI18n()

const config = useRuntimeConfig()
const baseUrl = config.public.siteUrl || 'https://astc.com.sa/astc/'
const staticMetaData = {
  title: 'ASTC',
  description:
    'ASTC has been a trusted contractor in Saudi Arabia since 2007, delivering expert-level Project Management, Telecom Engineering, and IT services.',
  type: 'website',
  image: `${baseUrl}/favicon.ico`,
  url: `${baseUrl}/astc/`,
  keywords:
    'ASTC, Arabian for Science and Technology Co., Saudi contractor, project management, telecom, IT services',
  author: 'ASTC Team'
}

useHead({
  htmlAttrs: {
    dir: computed(() => locales.value.find((l) => l.code === locale.value)?.dir || 'ltr'),
    lang: computed(() => locale.value)
  },
  title: staticMetaData.title,
  meta: [
    { hid: 'charset', name: 'charset', content: 'utf-8' },
    {
      hid: 'description',
      name: 'description',
      content: staticMetaData.description
    },
    {
      hid: 'author',
      name: 'author',
      content: staticMetaData.author
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: staticMetaData.keywords
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: staticMetaData.title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: staticMetaData.description
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: staticMetaData.type
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: staticMetaData.image
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: staticMetaData.url
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: staticMetaData.title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: staticMetaData.description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: staticMetaData.image
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: staticMetaData.url
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
      href: '/favicon.ico'
    }
  ]
})
</script>
