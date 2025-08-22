<template>
  <section
    :class="[
      'app-container flex flex-col bg-[#F0F0F0] pb-[150px] pt-[--header-height] font-zarid text-black lg:pb-[230px] 3xl:pb-[247px]'
    ]"
  >
    <h1 class="head-title mt-[100px] lg:mt-[120px] 3xl:mt-[160px]">
      {{ products?.[`title_${locale}`] }} & {{ solutions?.[`title_${locale}`] }}
    </h1>
    <section
      class="mt-[80px] flex flex-col justify-start gap-[83px] lg:mt-[97px] lg:gap-[126px] 3xl:mt-[123px] 3xl:gap-[166px]"
    >
      <article>
        <h2 class="main-title">{{ products?.[`title_${locale}`] }}</h2>
        <div class="imgs-contianer mt-[74.47px]">
          <ProductCard v-for="(item, i) in products?.items || []" :data="item" />
        </div>
      </article>
      <article>
        <h2 class="main-title">{{ solutions?.[`title_${locale}`] }}</h2>
        <div class="imgs-contianer imgs-contianer--wide mt-[29px]">
          <ProductCard v-for="(item, i) in solutions?.items || []" :data="item" wide />
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
definePageMeta({
  layoutProps: {
    showProductsSection: false
  }
})
usePageHead()

const { locale } = useI18n()
const { productsAndSolutions, fetchProductsAndSolutions } = useProductsAndSolutions()
await fetchProductsAndSolutions()
const products = computed(() => productsAndSolutions.value.find((data) => data.code == 'products'))
const solutions = computed(() =>
  productsAndSolutions.value.find((data) => data.code == 'solutions')
)
</script>
<style scoped>
.head-title {
  @apply text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#465AE5];
  @apply lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px];
  @apply 3xl:text-[140px] 3xl:leading-[133px] 3xl:tracking-[1.4px];
}
.main-title {
  @apply text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#18264A];
  @apply 3xl:text-[90px] 3xl:leading-[85.5px] 3xl:tracking-[0.9px];
}
/*------------------* */
.imgs-contianer {
  @apply flex w-full max-w-full flex-wrap justify-center gap-x-[14px] gap-y-[28.5px];
  @apply xs:justify-start;
  @apply lg:justify-start lg:gap-x-[50px] lg:gap-y-[103.45px];
  @apply 3xl:max-w-[80%] 3xl:gap-x-[108px] 3xl:gap-y-[103px];
}
.imgs-contianer--wide {
  @apply lg:gap-x-[108px] lg:gap-y-[103px];
  @apply 3xl:max-w-[100%] 3xl:gap-x-[108px] 3xl:gap-y-[103px];
}
</style>
