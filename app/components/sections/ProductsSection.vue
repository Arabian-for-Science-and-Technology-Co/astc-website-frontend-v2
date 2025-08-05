<template>
  <section
    :class="[
      'app-container flex flex-col gap-[66px] bg-[FFF] pt-[48px] font-zarid text-black',
      'lg:pt-[80px]',
      '3xl:pt-[80px]'
    ]"
  >
    <article>
      <h2 class="main-title">{{ products?.[`title_${locale}`] }}</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure v-for="(item, i) in products?.items || []" class="imgs-contianer__card">
          <BaseImg
            densities="x1 x2"
            format="webp"
            :key="i"
            :src="item.image"
            class="imgs-contianer__card__img"
            :alt="`Image ${i + 1} representing product`"
          />
          <figcaption class="imgs-contianer__card__title">
            {{ item?.[`title_${locale}`] }}
          </figcaption>
        </figure>
      </div>
    </article>
    <article>
      <h2 class="main-title">{{ solutions?.[`title_${locale}`] }}</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure
          v-for="(item, i) in solutions?.items || []"
          class="imgs-contianer__card imgs-contianer__card--wide"
        >
          <BaseImg
            densities="x1 x2"
            format="webp"
            :key="i"
            :src="item.image"
            class="imgs-contianer__card__img"
            :alt="`Image ${i + 1} representing solution`"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="imgs-contianer__card__title">
            {{ item?.[`title_${locale}`] }}
          </figcaption>
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup>
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
const { locale } = useI18n()
const { productsAndSolutions, fetchProductsAndSolutions } = useProductsAndSolutions()
await fetchProductsAndSolutions()
const products = computed(() => productsAndSolutions.value.find((data) => data.code == 'products'))
const solutions = computed(() =>
  productsAndSolutions.value.find((data) => data.code == 'solutions')
)
</script>
<style scoped>
.main-title {
  @apply text-xl font-semibold not-italic leading-[normal] tracking-[0.2px];
}
.imgs-contianer {
  @apply flex flex-wrap justify-start gap-x-[23.09px] gap-y-[38.75px];
  @apply lg:gap-[60px];
}
.imgs-contianer__card {
  @apply flex w-[90.3px] flex-col items-center gap-[11.67px];
  @apply lg:w-[120px] lg:gap-[20px];
  @apply 3xl:w-[160px];
}
.imgs-contianer__card--wide {
  @apply w-[180px] lg:w-[120px] 3xl:w-[160px];
}
.imgs-contianer__card__img {
  @apply h-[90.3px] w-full overflow-hidden rounded-[20.845px] transition-all hover:translate-y-[-5px];
  @apply lg:h-[120px] lg:rounded-[27.692px];
  @apply 3xl:h-[160px] 3xl:rounded-[36.923px];

  &:hover {
    filter: drop-shadow(0 16px 28px rgba(23, 120, 255, 0.5));
  }
}
.imgs-contianer__card__title {
  @apply w-full text-center text-[16px] font-[500] uppercase not-italic leading-[normal] tracking-[1.28px];
  @apply lg:text-xl lg:font-[500] lg:tracking-[1.6px];
}
</style>
