<template>
  <div :class="['bg-[#F0F0F0] font-zarid', 'lg:pb-[300px]', '3xl:pb-[280px]']" :styl>
    <div
      :class="[
        'bg flex h-screen max-h-[968px] flex-col justify-end bg-[#0D1667] pb-[60px] pt-[--header-height] text-white',
        'lg:pb-[117px]',
        '3xl:pb-[147px]'
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
    <div class="min-h-screen"></div>
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
</script>
<style scoped>
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
