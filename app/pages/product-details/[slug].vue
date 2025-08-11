<template>
  <div :class="['bg-[#F0F0F0] font-zarid']" :styl>
    <div
      :class="[
        'bg flex h-screen max-h-[700px] flex-col justify-end bg-[#0D1667] pb-[60px] pt-[--header-height] text-white',
        'lg:max-h-[720px] lg:pb-[117px]',
        '3xl:max-h-[968px] 3xl:pb-[147px]'
      ]"
      :style="{
        backgroundImage: `url(${productData?.cover_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundPosition: 'no-repeat'
      }"
    >
      <header class="app-container text-white">
        <h6
          :class="[
            'text-[20px] font-[600] leading-[normal] tracking-[0.2px]',
            'lg:text-[30px] lg:leading-[33px] lg:tracking-[0.3px]'
          ]"
        >
          {{ productData?.category?.[`title_${locale}`] || 'All products' }}
        </h6>
        <h4 :class="['head-title mt-[22px]', 'lg:mt-[15px]']">
          {{ productData?.[`title_${locale}`] }}
        </h4>
      </header>
    </div>
    <div
      :class="[
        'min-h-screen pb-[60px] pt-[60px] text-[#18264A]',
        'lg:pb-[228px] lg:pt-[90px]',
        '3xl:pb-[235px]'
      ]"
    >
      <template v-for="item in productData.item_sections" :key="item?.id">
        <ProductDetailsTemplate
          class="app-container app-container--edit"
          v-if="!item?.image_blocks?.length"
          :data="item"
        />
        <div v-else :class="['mt-[59px]', 'lg:mt-[82px]']">
          <h2
            v-if="item?.[`title_${locale}`]"
            :class="[
              'app-container app-container--edit text-[30px] font-[600] leading-[33px] tracking-[0.3px]'
            ]"
          >
            {{ item?.[`title_${locale}`] }}
          </h2>

          <div
            :class="[
              'app-container app-container--edit :mt-[30px] flex w-full max-w-full flex-wrap justify-center gap-x-[14px] gap-y-[28.5px] !pe-0',
              'lg:mt-[60px] lg:justify-start lg:gap-x-[50px] lg:gap-y-[103.45px]',
              'xl:gap-x-[108px] xl:gap-y-[103px] 3xl:max-w-[85%]'
            ]"
          >
            <ProductCard v-for="(imageBlock, i) in item?.image_blocks || []" :data="imageBlock" />
          </div>
        </div>
      </template>
      <div class="app-container app-container--edit">
        <BaseButton
          @click="navigateTo(`/contact`)"
          :class="[
            'font-section mt-[40px] h-[68px] max-w-[295px] text-[16px] font-[500] leading-[normal] lg:mt-[95px]',
            'lg:text-[20px] lg:font-[400] lg:leading-[21px] lg:tracking-[0.2px]'
          ]"
        >
          {{ 'Let’s Talk' }}
        </BaseButton>
      </div>
    </div>

    <BaseModal
      v-model:open="modalOpen"
      containerClass="w-full !mx-0 max-w-[310px] sm:max-w-[500px] 3xl:!max-w-[612px] !bg-transparent"
      bodyClass="sm:!px-0 px-[30px] flex justify-center items-center  !py-0"
      :canCloseByBackdrop="true"
      :canCloseByEsc="true"
    >
      <ClickZoom
        img-class="max-h-[85vh]"
        :src="selectedCertificate.image"
        :tap-zoom="2.5"
        :max-scale="5"
      />
    </BaseModal>
  </div>
</template>

<script setup>
definePageMeta({
  layoutProps: {
    isWhiteLogo: true,
    selectedTabClass: 'bg-[#010101] text-white'
  }
})
const selectedCertificate = ref(null)
const modalOpen = ref(false)
const { locale } = useI18n()
const route = useRoute()
const customFetch = useCustomFetch()
const { data: productData } = await useAsyncData(
  () => customFetch(`/website/home/item/${route.params.slug}`),
  {
    transform: (res) => res.data || []
  }
)
usePageHead(() => ({
  title: productData.value?.[`meta_title_${locale.value}`],
  description: productData.value?.[`meta_description_${locale.value}`],
  keywords: productData.value?.[`meta_keywords_${locale.value}`]
}))
</script>
<style scoped>
.app-container--edit {
  @media (min-width: 1600px) {
    padding-inline-start: 438px;
    padding-inline-end: 586px;
  }
}
.head-title {
  @apply text-[52px] font-[200] leading-[49.4px] tracking-[0.52px];
  @apply lg:text-[140px] lg:leading-[133px] lg:tracking-[1.4px];
}
.bg {
  background:
    url('~/assets/images/products/raad-2.jpg') lightgray 0px 62.383px / 100% 132.248% no-repeat,
    #d9d9d9;
}
.app-container--edit {
  @media (min-width: 1600px) {
    padding-inline-start: 438px;
    padding-inline-end: 586px;
  }
}
.font-section {
  font-family: Roboto !important;
}

@media (min-width: 1024px) {
  .font-section {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif !important;
  }
}
</style>
