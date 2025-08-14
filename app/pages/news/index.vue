<template>
  <div
    :class="[
      'app-container-small min-h-screen bg-[#465AE6] pb-[180px] pt-[--header-height] font-zarid text-white',
      'lg:pb-[163px]',
      '3xl:pb-[140px]'
    ]"
  >
    <div class="mt-[128px] flex flex-wrap items-start justify-between gap-y-[19px] lg:mt-[129px]">
      <h1
        :class="[
          'font-durke text-[48px] font-[500] leading-[120%] tracking-[0.48px]',
          '3xl:text-[70px] 3xl:font-[500] 3xl:leading-[120%] 3xl:tracking-[0.7px]'
        ]"
      >
        {{ $t('news') }} /
      </h1>
      <p
        :class="[
          'flex items-center justify-start gap-[47px] text-[30px] font-[600] leading-[110%] tracking-[0.3px] text-[#0ADF0A] lg:mt-[12px]',
          'lg:gap-10'
        ]"
      >
        <span>
          {{ $fd(newsData[0]?.updated_at, 'll') }}
        </span>
        <span> {{ $fd(newsData[0]?.updated_at, 'h:mm A') }} </span>
      </p>
    </div>
    <div class="mt-[85px] flex flex-col gap-[59px] lg:mt-[143px] lg:gap-[73px]">
      <section v-for="(item, index) in newsData" class="group">
        <h4
          :class="[
            'transition-colors group-hover:text-[#0ADF0A]',
            'text-[30px] font-[600] leading-[110%] tracking-[0.3px]'
          ]"
        >
          {{ $fd(item.updated_at, 'll') }}
        </h4>
        <p
          :class="[
            'mt-[8px] text-[30px] font-[400] leading-[110%] transition-colors group-hover:text-[#0ADF0A] lg:tracking-[0.3px]',
            'lg:mt-[6px] lg:text-[52px] lg:font-[200] lg:leading-[95%] lg:tracking-[0.52px]'
          ]"
        >
          {{ item?.[`title_${locale}`] }}
        </p>
        <BaseImg
          densities="x1 x2"
          format="webp"
          v-if="item.image"
          :src="item.image"
          class="mt-[24px] aspect-[180/103] w-[279.623px] self-end rounded-[10px] object-cover lg:mt-[42px] lg:aspect-[7/4] lg:w-[280px]"
          :alt="`video`"
        />
        <div
          :class="[
            'mt-[56px] flex w-full max-w-[308px] items-center justify-start overflow-x-hidden text-[20px] font-[300] leading-[110%] tracking-[19.8px] text-[#0ADF0A] group-last-of-type:hidden',
            'lg:mt-[88px] lg:max-w-full lg:text-[30px]'
          ]"
        >
          #####################
        </div>
      </section>
      <button
        v-if="currentPage != totalPages"
        @click="currentPage++"
        :class="[
          'relative mx-auto mt-[28px] self-center text-[22px] font-[500] leading-[120%] tracking-[0.22px] text-[#0ADF0A] transition-all hover:opacity-80',
          'font-durke lg:mt-[43px] lg:text-[28px] lg:tracking-[0.28px]'
        ]"
      >
        <SlashSvg />
        <span class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          {{ $t('more_news') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layoutProps: {
    isWhiteLogo: true,
    tabsClass: null,
    selectedTabClass: 'bg-[#465AE6] text-white'
  }
})
const customFetch = useCustomFetch()
const {
  rows: newsData,
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
  defaultPerPage: 3
})
const { locale } = useI18n()
const { getPage } = usePages()
const newsPage = getPage('news')
usePageHead(() => ({
  title: newsPage?.[`meta_title_${locale.value}`],
  description: newsPage?.[`meta_description_${locale.value}`],
  keywords: newsPage?.[`meta_keywords_${locale.value}`]
}))
</script>
<style></style>
