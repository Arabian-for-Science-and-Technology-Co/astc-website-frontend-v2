<template>
  <div :class="['flex min-h-screen bg-[#F0F0F0] pt-[--header-height] font-zarid text-black']">
    <section
      :class="[
        'app-container-small mb-[125px] mt-[40px] flex w-fit flex-col',
        'lg:mb-[153px] lg:mt-[65px]'
      ]"
    >
      <dynamicPageTemplate
        v-for="item in pageDetailsData"
        :key="item?.id"
        :data="item"
        class="first-of-type:mt-[68px] first-of-type:lg:mt-[62px] first-of-type:3xl:mt-[106px]"
      />
    </section>
  </div>
</template>

<script setup>
import dynamicPageTemplate from '~/pages/(dynamic-pages)/_components/dynamicPageTemplate.vue'
const route = useRoute()
const { locale } = useI18n()

if (!route.params.slug || !route.query.id) {
  throw navigateTo('/', { redirectCode: 307, replace: true })
}

const customFetch = useCustomFetch()
const { data: pageDetailsData } = await useAsyncData(
  () => `dynamic-pages:${route.params.slug}`,
  () => customFetch(`/website/home/page/${route.query.id}/sections`),
  {
    transform: (res) => res.data || [],
    watch: [() => route.params.slug]
  }
)

const { getPage } = usePages()
const pageData = getPage(route.params.slug)
usePageHead(() => ({
  title: pageData?.[`meta_title_${locale.value}`],
  description: pageData?.[`meta_description_${locale.value}`],
  keywords: pageData?.[`meta_keywords_${locale.value}`]
}))
</script>
<style scoped></style>
