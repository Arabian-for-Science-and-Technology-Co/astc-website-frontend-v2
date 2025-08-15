<template>
  <div :class="['min-h-screen bg-[#F0F0F0] pt-[--header-height] font-zarid text-black']">
    <section class="app-container-small mt-[128px] min-h-screen lg:mt-[129px]">
      <h1
        :class="[
          'font-durke text-[28px] font-[500] leading-[120%] tracking-[0.28px] text-[#0ADF0A]'
        ]"
      >
        {{ $t('news') }} /
      </h1>
      <article>
        <h4
          :class="[
            'transition-colors group-hover:text-[#0ADF0A]',
            'text-[30px] font-[600] leading-[110%] tracking-[0.3px]'
          ]"
        >
          {{ $fd(newsData?.updated_at, 'll') }}
        </h4>
        <p
          :class="[
            'mt-[8px] text-[30px] font-[400] leading-[110%] transition-colors group-hover:text-[#0ADF0A] lg:tracking-[0.3px]',
            'lg:mt-[6px] lg:text-[52px] lg:font-[200] lg:leading-[95%] lg:tracking-[0.52px]'
          ]"
        >
          {{ newsData?.[`title_${locale}`] }}
        </p>
        <BaseImg
          densities="x1 x2"
          format="webp"
          v-if="newsData?.image"
          :src="newsData?.image"
          class="mt-[24px] aspect-[180/103] w-[279.623px] self-end rounded-[10px] object-cover lg:mt-[42px] lg:aspect-[7/4] lg:w-[280px]"
          :alt="`video`"
        />
        <NewsTemplate :content="newsData?.[`content_${locale}`]" />
        <div>
          <div>
            <h3>{{ newsData?.testimonial?.[`content_${locale}`] }}</h3>
            <BaseImg
              densities="x1 x2"
              format="webp"
              v-if="newsData?.testimonial?.image"
              :src="newsData?.testimonial?.image"
              class="mt-[24px] aspect-[180/103] bg-slate-500/50 w-[279.623px] self-end rounded-[10px] object-cover lg:mt-[42px] lg:aspect-[7/4] lg:w-[280px]"
              :alt="`video`"
            />
          </div>
          <p>
            {{ newsData?.testimonial?.[`name_${locale}`] }}
            {{ newsData?.testimonial?.[`position_${locale}`] }}
          </p>
        </div>
      </article>
    </section>
    <ClientOnly>
      <NewsList
        class="app-container-small bg-[#465AE6] text-white"
        :listData="newsListData"
        :isLoadingMore="isLoadingMore"
        :totalPages="totalPages"
        v-model:currentPage="currentPage"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import NewsList from './_components/NewsList.vue'
import NewsTemplate from './_components/NewsTemplate.vue'
definePageMeta({
  layoutProps: {
    isWhiteLogo: false,
    selectedTabClass: 'bg-[#465AE6] text-white'
  }
})
const route = useRoute()
const { locale } = useI18n()

const customFetch = useCustomFetch()
const { data: newsData } = await useAsyncData(
  () => `news-details:${route.params.slug}`,
  () => customFetch(`/website/news/${route.params.slug}`),
  {
    transform: (res) => res.data || [],
    watch: [() => route.params.slug]
  }
)

const {
  rows: newsListData,
  isLoading,
  isLoadingMore,
  currentPage,
  totalPages
} = usePaginatedFetcher({
  service: async (params) => {
    return await customFetch(`/website/news`, {
      method: 'GET',
      params
    })
  },
  isLoadMorePagination: true,
  defaultPerPage: 3,
  watch: [() => route.params.slug]
})
watch(
  newsListData,
  (newsListData) => {
    console.log('newsListData', newsListData)
  },
  { deep: true }
)
usePageHead(() => ({
  title: newsData.value?.[`meta_title_${locale.value}`],
  description: newsData.value?.[`meta_description_${locale.value}`],
  keywords: newsData.value?.[`meta_keywords_${locale.value}`]
}))
</script>
<style></style>
