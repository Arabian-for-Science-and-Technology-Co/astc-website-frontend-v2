<template>
  <section
    :class="[
      'app-container flex flex-col bg-[#F0F0F0] pb-[150px] pt-[--header-height] font-zarid text-black lg:pb-[230px] 3xl:pb-[247px]'
    ]"
  >
    <section
      class="mt-[80px] flex flex-col justify-start gap-[83px] lg:mt-[97px] lg:gap-[126px] 3xl:mt-[123px] 3xl:gap-[166px]"
    >
      <article>
        <h2 class="main-title">{{ title }}</h2>
        <div class="imgs-contianer mt-[74.47px]">
          <ProductCard v-for="(item, i) in categoryItems || []" :data="item" />
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
const route = useRoute()
const { apiFetch } = useApi()
const { data: categoryItems } = await useApiAsyncData(
  () => `category-details:${route.params.id}`,
  () => apiFetch(`/website/home/categories/${route.params.id}/items`),
  {
    transform: (res) => res.data || [],
    watch: [() => route.params.id]
  }
)
const { t, locale } = useI18n()

const title = computed(
  () => categoryItems.value?.[0]?.category?.[`title_${locale.value}`] || t('category')
)
useCustomHead(() => ({
  title: title.value
}))
</script>
<style scoped>
.main-title {
  @apply text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#18264A];
  @apply 3xl:text-[90px] 3xl:leading-[85.5px] 3xl:tracking-[0.9px];
}
.imgs-contianer {
  @apply flex w-full max-w-full flex-wrap justify-center gap-x-[14px] gap-y-[28.5px];
  @apply xs:justify-start;
  @apply lg:justify-start lg:gap-x-[50px] lg:gap-y-[103.45px];
  @apply 3xl:max-w-[80%] 3xl:gap-x-[108px] 3xl:gap-y-[103px];
}
</style>
