<template>
  <div :class="['min-h-screen bg-[#F0F0F0] pt-[--header-height] font-zarid text-[#18264A]']">
    <section class="app-container-small mt-[128px] min-h-screen lg:mt-[129px]">
      <h1
        :class="[
          'font-durke text-[28px] font-[500] leading-[120%] tracking-[0.28px] text-[#0ADF0A]'
        ]"
      >
        {{ $t('news') }} /
      </h1>
      <article :class="['mt-[64px]', 'lg:mt-[84px]']">
        <h4
          :class="[
            'text-black transition-colors',
            'text-[30px] font-[600] leading-[110%] tracking-[0.3px]'
          ]"
        >
          {{ $fd(newsData?.updated_at, 'll') }}
        </h4>
        <p
          :class="[
            'mt-[18px] text-[52px] font-[200] leading-[95%] tracking-[0.52px] transition-colors group-hover:text-[#0ADF0A]',
            'lg:mt-[8px] lg:text-[90px] lg:leading-[95%] lg:tracking-[0.9px]'
          ]"
        >
          {{ newsData?.[`title_${locale}`] }}
        </p>
        <BaseImg
          densities="x1 x2"
          format="webp"
          v-if="newsData?.image"
          :src="newsData?.image"
          class="mt-[50px] aspect-[180/103] w-full self-end rounded-[10px] object-cover lg:mt-[133px] lg:aspect-[173/99]"
          :alt="`video`"
        />
        <NewsTemplate class="mt-[50px] lg:mt-[84px]" :content="newsData?.[`content_${locale}`]" />
        <div :class="['mx-0 mt-[60px]', 'lg:me-[125px] lg:ms-[86px] lg:mt-[97.5px]']">
          <div class="flex justify-between">
            <h3
              :class="[
                'text-[30px] font-[200] leading-[110%] tracking-[0.3px]',
                'lg:text-[52px] lg:leading-[95%] lg:tracking-[0.52px]'
              ]"
            >
              {{ newsData?.testimonial?.[`content_${locale}`] }}
            </h3>
            <BaseImg
              densities="x1 x2"
              format="webp"
              v-if="newsData?.testimonial?.image"
              :src="newsData?.testimonial?.image"
              class="mt-[24px] aspect-square w-[89px] self-end rounded-full bg-slate-500/50 object-cover lg:mt-[42px] lg:w-[130px]"
              :alt="`video`"
            />
          </div>
          <p
            :class="[
              'text-start text-[20px] font-[300] leading-[105%] tracking-[0.2px] text-black'
            ]"
          >
            <span class="font-[600]">{{ newsData?.testimonial?.[`name_${locale}`] }}</span>
            <br />
            <span>{{ newsData?.testimonial?.[`position_${locale}`] }}</span>
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
