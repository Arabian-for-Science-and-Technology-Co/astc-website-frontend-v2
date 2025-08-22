<template>
  <div :class="['bg-[#F0F0F0] font-zarid']">
    <div
      :class="[
        'flex h-screen max-h-[700px] flex-col justify-end bg-[#0D1667] pb-[60px] pt-[--header-height] text-white',
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
          v-if="productData?.category?.[`title_${locale}`]"
          :class="[
            'text-[20px] font-[600] leading-[normal] tracking-[0.2px]',
            'lg:text-[30px] lg:leading-[33px] lg:tracking-[0.3px]'
          ]"
        >
          {{ productData?.category?.[`title_${locale}`] }}
        </h6>
        <h4 :class="['head-title mt-[22px]', 'lg:mt-[15px]']">
          {{ productData?.[`title_${locale}`] }}
        </h4>
      </header>
    </div>
    <div :class="['min-h-screen pb-[60px] text-[#18264A]', 'lg:pb-[228px]', '3xl:pb-[235px]']">
      <ProductDetailsTemplate
        class="app-container-small"
        v-if="productData?.item_sections?.[0]"
        :data="productData?.item_sections?.[0]"
      />

      <ProductDetailsTemplate
        v-for="item in productData?.item_sections?.slice?.(1)"
        :key="item?.id"
        class="app-container-small"
        :data="item"
      />
      <div v-if="productData?.integrated_items?.length" :class="['mt-[59px]', 'lg:mt-[82px]']">
        <h2
          v-if="productData?.[`title_${locale}`]"
          :class="['app-container-small text-[30px] font-[600] leading-[33px] tracking-[0.3px]']"
        >
          {{ $t('integrated', { type: productData?.category?.[`title_${locale}`] }) }}
        </h2>

        <div
          :class="[
            'app-container-small mt-[30px] flex w-full max-w-full flex-wrap justify-center gap-x-[14px] gap-y-[28.5px] !pe-0',
            'xs:justify-start',
            'lg:mt-[60px] lg:gap-x-[50px] lg:gap-y-[103.45px]',
            'xl:gap-x-[108px] xl:gap-y-[103px] 3xl:max-w-[85%] 3xl:!pe-0'
          ]"
        >
          <ProductCard
            v-for="(integratedItem, i) in productData?.integrated_items || []"
            :data="integratedItem"
          />
        </div>
      </div>
      <div class="app-container-small">
        <BaseButton
          @click="modalOpen = true"
          :class="[
            'font-section mt-[40px] h-[68px] max-w-[295px] text-[16px] font-[500] leading-[normal] lg:mt-[95px]',
            'lg:text-[20px] lg:font-[400] lg:leading-[21px] lg:tracking-[0.2px]'
          ]"
        >
          {{ $t('lets_talk') }}
        </BaseButton>
      </div>
    </div>
    <RequestDocumentModal :itemId="productData?.id" v-model:open="modalOpen" />
  </div>
</template>

<script setup>
import RequestDocumentModal from '~/pages/product-details/_components/RequestDocumentModal.vue'
import ProductDetailsTemplate from '~/pages/product-details/_components/ProductDetailsTemplate.vue'

const route = useRoute()
definePageMeta({
  layoutProps: {
    isWhiteLogo: true,
    selectedTabClass: 'bg-[#010101] text-white'
  }
})
const modalOpen = ref(false)
const { locale } = useI18n()
const customFetch = useCustomFetch()
const { data: productData } = await useAsyncData(
  () => `product-details:${route.params.slug}`,
  () => customFetch(`/website/home/item/${route.params.slug}`),
  {
    transform: (res) => res.data || [],
    watch: [() => route.params.slug]
  }
)
useCustomHead(() => ({
  title: productData.value?.[`meta_title_${locale.value}`],
  description: productData.value?.[`meta_description_${locale.value}`],
  keywords: productData.value?.[`meta_keywords_${locale.value}`]
}))
</script>
<style scoped>
.head-title {
  @apply text-[52px] font-[200] leading-[49.4px] tracking-[0.52px];
  @apply lg:text-[140px] lg:leading-[133px] lg:tracking-[1.4px];
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
