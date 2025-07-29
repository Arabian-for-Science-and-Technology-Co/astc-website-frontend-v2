<template>
  <section class="app-container bg-[FFF] pb-[121px] pt-[80px] font-zarid">
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
        <figure v-for="(solution, i) in solutions" class="imgs-contianer__card">
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
  @apply text-xl font-semibold not-italic leading-[normal] tracking-[0.2px] text-black;
}
.imgs-contianer {
  @apply flex flex-wrap justify-start gap-[60px];
}
.imgs-contianer__card {
  @apply flex flex-col items-center gap-[20px];
}
.imgs-contianer__card__img {
  @apply h-[160px] w-[160px] overflow-hidden rounded-[36.923px] transition-all hover:translate-y-[-5px];
  &:hover {
    filter: drop-shadow(0 16px 28px rgba(23, 120, 255, 0.5));
  }
}
.imgs-contianer__card__title {
  @apply max-w-[136px] text-center text-xl font-medium uppercase not-italic leading-[normal] tracking-[1.6px] text-black;
}
</style>
