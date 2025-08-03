<template>
  <section
    :class="[
      'app-container flex flex-col gap-[66px] bg-[FFF] pt-[48px] font-zarid text-black',
      'lg:pt-[80px]',
      '3xl:pt-[80px]'
    ]"
  >
    <article>
      <h2 class="main-title">Products</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure v-for="(item, i) in categoryItems" class="imgs-contianer__card">
          <img
            :key="i"
            :src="item.image"
            class="imgs-contianer__card__img"
            :alt="`Image ${i + 1} representing product`"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="imgs-contianer__card__title">
            {{ item?.[`title_${locale}`] }}
          </figcaption>
        </figure>
      </div>
    </article>
    <article>
      <h2 class="main-title">Solutions</h2>
      <div class="imgs-contianer mt-[29px]">
        <figure
          v-for="(solution, i) in solutions"
          class="imgs-contianer__card imgs-contianer__card--wide"
        >
          <img
            :key="i"
            :src="solution.src"
            class="imgs-contianer__card__img"
            :alt="`Image ${i + 1} representing solution`"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="imgs-contianer__card__title">
            {{ solution.title }}
          </figcaption>
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup>
const solutionsModules = import.meta.glob('~/assets/Images/solutions/solution_*', {
  eager: true
})
const solutionsTitles = ['Saudi Build', 'Saudi Build']
const solutions = Object.entries(solutionsModules).map(([_, module], index) => ({
  src: module.default,
  title: solutionsTitles[index]
}))

const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
const { locale } = useI18n()
const { categoryItems, fetchCategoryItems } = useCategoryItems()
await fetchCategoryItems()

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
