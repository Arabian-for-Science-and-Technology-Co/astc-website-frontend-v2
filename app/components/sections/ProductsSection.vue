<template>
  <section class="app-container bg-[FFF] pb-[121px] pt-[80px] font-zarid text-black">
    <article>
      <h2 class="main-title">Products</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure v-for="(product, i) in products" class="imgs-contianer__card">
          <img :key="i" :src="product.src" class="imgs-contianer__card__img" alt="" />
          <figcaption class="imgs-contianer__card__title">
            {{ product.title }}
          </figcaption>
        </figure>
      </div>
    </article>
    <article class="mt-[66px]">
      <h2 class="main-title">Solutions</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure
          v-for="(solution, i) in solutions"
          class="imgs-contianer__card imgs-contianer__card--wide"
        >
          <img :key="i" :src="solution.src" class="imgs-contianer__card__img" alt="" />
          <figcaption class="imgs-contianer__card__title">
            {{ solution.title }}
          </figcaption>
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup>
const productsModules = import.meta.glob('~/assets/Images/products/product_*.png', { eager: true })
const solutionsModules = import.meta.glob('~/assets/Images/solutions/solution_*', {
  eager: true
})
const produtctTitles = [
  'RAAD Superapp',
  'Digital Twin',
  'Smart Fiber Optics',
  'Computer Vision',
  'PCR',
  'Immersion Cooling'
]
const solutionsTitles = ['Saudi Build', 'Saudi Build']
const products = Object.entries(productsModules)
  .map(([_, module], index) => ({ src: module.default, title: produtctTitles[index] }))
  .slice(0, 6)
const solutions = Object.entries(solutionsModules).map(([_, module], index) => ({
  src: module.default,
  title: solutionsTitles[index]
}))
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
  @apply 2xl:w-[160px];
}
.imgs-contianer__card--wide {
  @apply w-[180px] lg:w-[120px] 2xl:w-[160px];
}
.imgs-contianer__card__img {
  @apply h-[90.3px] w-full overflow-hidden rounded-[20.845px] transition-all hover:translate-y-[-5px];
  @apply lg:h-[120px] lg:rounded-[27.692px];
  @apply 2xl:h-[160px] 2xl:rounded-[36.923px];

  &:hover {
    filter: drop-shadow(0 16px 28px rgba(23, 120, 255, 0.5));
  }
}
.imgs-contianer__card__title {
  @apply w-full text-center text-[16px] font-[500] uppercase not-italic leading-[normal] tracking-[1.28px];
  @apply lg:text-xl lg:font-[500] lg:tracking-[1.6px];
}
</style>
