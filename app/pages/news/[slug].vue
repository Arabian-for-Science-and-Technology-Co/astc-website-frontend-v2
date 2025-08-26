<template>
  <div :class="['min-h-screen bg-[#F0F0F0] pt-[--header-height] font-zarid text-[#18264A]']">
    <section
      :class="[
        'app-container-small min-h-screen pb-[78px] pt-[78px]',
        'lg:pb-[174px] lg:pt-[134px]'
      ]"
    >
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
        <h5
          :class="[
            'mt-[18px] text-[52px] font-[200] leading-[95%] tracking-[0.52px] transition-colors group-hover:text-[#0ADF0A]',
            'lg:mt-[8px] lg:text-[90px] lg:leading-[95%] lg:tracking-[0.9px]'
          ]"
        >
          {{ newsData?.[`title_${locale}`] }}
        </h5>

        <div
          v-if="newsData?.video_url || newsData?.image"
          class="mt-[50px] aspect-[180/103] w-full self-end rounded-[10px] object-cover lg:mt-[133px] lg:aspect-[173/99]"
        >
          <CustomVideo
            v-if="newsData?.video_url"
            :poster="newsData?.image"
            :src="newsData?.video_url"
          />

          <BaseImg
            v-else
            densities="x1 x2"
            format="webp"
            :src="newsData?.image"
            class="h-full w-full object-cover"
            :alt="`video`"
          />
        </div>
        <Contnet
          v-if="newsData?.[`content_${locale}`]"
          :content="newsData?.[`content_${locale}`]"
          class="mt-[50px] lg:mt-[84px]"
        />
        <div
          :class="[
            'ms-[17px] mt-[60px] grid max-w-[677px] grid-cols-[1fr_auto] grid-rows-2',
            'lg:ms-[86px] lg:mt-[97.5px] lg:gap-x-[62px]'
          ]"
        >
          <h3
            :class="[
              'col-span-2 col-start-1 row-start-1 text-[30px] font-[200] leading-[110%] tracking-[0.3px]',
              'lg:col-span-1 lg:text-[52px] lg:leading-[95%] lg:tracking-[0.52px]'
            ]"
          >
            {{ newsData?.testimonial?.[`content_${locale}`] }}
          </h3>
          <BaseImg
            densities="x1 x2"
            format="webp"
            v-if="newsData?.testimonial?.image"
            :src="newsData?.testimonial?.image"
            :class="[
              'col-start-2 row-start-2 aspect-square w-[89px] rounded-full object-cover object-top',
              'lg:col-start-2 lg:row-start-1 lg:w-[130px]'
            ]"
            :alt="`video`"
          />
          <p
            :class="[
              'col-start-1 row-start-2 pt-[25px] text-start text-[20px] font-[300] leading-[105%] tracking-[0.2px] text-black',
              'lg:pt-[39px]'
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
        :class="[
          'app-container-small bg-[#465AE6] pb-[179px] pt-[80px] text-white',
          'lg:pb-[145px] lg:pt-[100px]'
        ]"
        :listData="newsListData"
        :isLoadingMore="isLoadingMore"
        :totalPages="totalPages"
        :loadMore="loadMore"
        :currentPage="currentPage"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import NewsList from './_components/NewsList.vue'
definePageMeta({
  layoutProps: {
    isWhiteLogo: false,
    selectedTabClass: 'bg-[#465AE6] text-white'
  }
})
const route = useRoute()
const { locale } = useI18n()

const { apiFetch } = useApi()
const { data: newsData } = await useApiAsyncData(
  () => `news-details:${route.params.slug}`,
  () => apiFetch(`/website/news/${route.params.slug}`),
  {
    transform: (res) => res.data || [],
    watch: [() => route.params.slug]
  }
)

const {
  rows: newsListData,
  loadMore,
  isLoadingMore,
  currentPage,
  totalPages
} = usePaginatedFetcher({
  service: async (params) => {
    return await apiFetch(`/website/news`, {
      method: 'GET',
      params
    })
  },
  isLoadMorePagination: true,
  defaultPerPage: 3,
  watch: [() => route.params.slug]
})

useCustomHead(() => ({
  title: newsData.value?.[`meta_title_${locale.value}`],
  description: newsData.value?.[`meta_description_${locale.value}`],
  keywords: newsData.value?.[`meta_keywords_${locale.value}`]
}))
</script>
<style></style>
