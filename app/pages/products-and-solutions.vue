<template>
  <section
    :class="[
      'app-container flex flex-col bg-[FFF] pb-[150px] pt-[--header-height] font-zarid text-black lg:pb-[230px] 3xl:pb-[247px]'
    ]"
  >
    <h1 class="head-title mt-[100px] lg:mt-[120px] 3xl:mt-[160px]">Products & Solutions</h1>
    <section
      class="mt-[80px] flex flex-col justify-start gap-[83px] lg:mt-[97px] lg:gap-[126px] 3xl:mt-[123px] 3xl:gap-[166px]"
    >
      <article>
        <h2 class="main-title">{{ products?.[`title_${locale}`] }}</h2>
        <div class="imgs-contianer mt-[74.47px]">
          <figure v-for="(item, i) in products?.items || []" class="imgs-contianer__card">
            <BaseImg
              densities="x1 x2"
              format="webp"
              :key="i"
              :src="item.image"
              class="imgs-contianer__card__img"
              :alt="`Image ${i + 1} representing product`"
            />
            <figcaption>
              <h3 class="imgs-contianer__card__title">{{ item?.[`title_${locale}`] }}</h3>
              <p class="imgs-contianer__card__desc">{{ item?.[`meta_desc_${locale}`] }}</p>
            </figcaption>
          </figure>
        </div>
      </article>
      <article>
        <h2 class="main-title">{{ solutions?.[`title_${locale}`] }}</h2>
        <div class="imgs-contianer imgs-contianer--wide mt-[29px]">
          <figure
            v-for="(item, i) in solutions?.items || []"
            class="imgs-contianer__card imgs-contianer__card--wide"
          >
            <BaseImg
              densities="x1 x2"
              format="webp"
              :key="i"
              :src="item.image"
              class="imgs-contianer__card__img imgs-contianer__card__img--wide"
              :alt="`Image ${i + 1} representing solution`"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="w-full">
              <h3 class="imgs-contianer__card__title">{{ item?.[`title_${locale}`] }}</h3>
              <p class="imgs-contianer__card__desc imgs-contianer__card__desc--wide">
                {{ item?.[`meta_desc_${locale}`] }}
              </p>
            </figcaption>
          </figure>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
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
  @apply lg:justify-start lg:gap-x-[50px] lg:gap-y-[103.45px];
  @apply 3xl:max-w-[80%] 3xl:gap-x-[108px] 3xl:gap-y-[103px];
}
.imgs-contianer--wide {
  @apply lg:gap-x-[108px] lg:gap-y-[103px];
  @apply 3xl:max-w-[100%] 3xl:gap-x-[108px] 3xl:gap-y-[103px];
}
/*------------------* */
.imgs-contianer__card {
  @apply flex w-[162px] flex-col items-center gap-[16.4px];
  @apply lg:w-[140px] lg:gap-[29px];
  @apply xl:w-[260px];
  @apply 3xl:w-[260px];
}
.imgs-contianer__card--wide {
  @apply w-[261.9px];
  @apply lg:w-[400px];
  @apply xl:w-[520px];
}
/*------------------* */
.imgs-contianer__card__img {
  @apply h-[131.3px] w-[131.3px] overflow-hidden rounded-[30.3px] transition-all hover:translate-y-[-5px];
  @apply lg:!h-[140px] lg:w-full lg:rounded-[40px];
  @apply xl:!h-[260px] xl:rounded-[60px];
  @apply 3xl:!h-[260px] 3xl:rounded-[60px];

  &:hover {
    filter: drop-shadow(0 16px 28px rgba(23, 120, 255, 0.5));
  }
}
.imgs-contianer__card__img--wide {
  @apply h-[131px] w-full;
}
/*------------------* */
.imgs-contianer__card__title {
  @apply w-full text-center text-xl font-[500] uppercase not-italic leading-[normal] tracking-[1.6px];
}
/*------------------* */
.imgs-contianer__card__desc {
  @apply mt-[3px] w-full px-0 text-center text-xl font-[400] not-italic leading-[21px] tracking-[0.2px];
  @apply lg:mt-[17px] lg:px-2;
}
.imgs-contianer__card__desc--wide {
  @apply mx-auto max-w-[221px];
  @apply lg:max-w-[284px];
  @apply 3xl:max-w-[220px];
}
/*------------------* */
</style>
