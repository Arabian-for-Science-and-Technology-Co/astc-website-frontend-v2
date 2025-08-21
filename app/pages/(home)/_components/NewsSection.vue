<template>
  <section
    id="NewsSection"
    class="h-[200px] bg-[#465AE6] pb-[36px] pt-[30px] font-zarid rtl:lg:h-[205px]"
  >
    <ScrollWithDragWrapper class="app-container h-full !overflow-y-visible">
      <div class="flex h-full items-start justify-start gap-[70px] lg:gap-[95px]">
        <NuxtLink
          class="group relative flex h-full flex-shrink-0 items-start justify-start pe-[100px] last-of-type:pe-0"
          v-for="(item, index) in newsData"
          :to="`/news/${item.slug}`"
        >
          <div class="not-italic text-white transition-colors hover:text-[#0ADF0A]">
            <h4
              :class="[
                'main-title mb-[14px] text-[16px] font-[500] uppercase leading-[19.2px] tracking-[0.16px]',
                'lg:mb-[2px] lg:text-[32px] lg:font-[700] lg:leading-[38.4px] lg:tracking-[0.32px]'
              ]"
            >
              {{ $fd(item.updated_at, 'll') }}
            </h4>
            <h4
              :class="[
                'text-truncate-multi w-[220px] text-[20px] font-[200] leading-[21px] tracking-[0.32px]',
                'lg:w-[580px] lg:pe-[10%] lg:text-[32px] lg:font-[300] lg:leading-[30.4px] rtl:lg:leading-[34px]'
              ]"
            >
              {{ item?.[`title_${locale}`] }}
            </h4>
          </div>
          <BaseImg
            densities="x1 x2"
            format="webp"
            v-if="item.image"
            :src="item.image"
            class="mb-[17px] h-[87px] w-[133.912px] self-end rounded-[10px] object-cover lg:mb-0 lg:h-[102px] lg:w-[157px]"
            :alt="`video`"
          />
          <div
            class="absolute bottom-0 end-0 flex flex-col items-start justify-start text-[40px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#0ADF0A] group-last-of-type:hidden lg:text-[52px]"
          >
            <span>#</span>
            <span>#</span>
            <span>#</span>
          </div>
        </NuxtLink>
        <button
          @click="navigateTo('/news')"
          class="my-auto whitespace-nowrap pe-[50px] text-center align-middle font-durke text-[20px] font-medium uppercase not-italic leading-[120%] tracking-[0.32px] text-[#0ADF0A] hover:text-white lg:pe-[151px] lg:text-[32px] rtl:font-[800]"
        >
          {{ $t('all_news') }} /
        </button>
      </div>
    </ScrollWithDragWrapper>
  </section>
</template>

<script setup>
import newsVideo from '~/assets/images/news-video.png'
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
const customFetch = useCustomFetch()
const { locale } = useI18n()
const { data: newsData } = await useAsyncData(
  () => customFetch('/website/news?per_page=3&page=1'),
  {
    transform: (res) => res.data || []
  }
)
const data = [
  {
    title: 'June 3, 2025',
    desc: `Arabian for Sience and Technology.  Empowering the Future with Cutting-Edge   TechnologyTechnology Technology Technology Technology Technology Technology Technology `,
    video: newsVideo
  },
  {
    title: 'June 3, 2025',
    desc: 'Arabian for Sience and Technology.',
    video: null
  },
  {
    title: 'June 3, 2025',
    desc: 'Arabian for Sience and Technology. Empowering the Future with Cutting-Edge Technology...',
    video: null
  }
]
</script>
<style>
#NewsSection .main-title {
  font-family: 'Druk Wide', sans-serif;
}

@media (min-width: 1024px) {
  #NewsSection .main-title {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif;
  }
}
</style>
