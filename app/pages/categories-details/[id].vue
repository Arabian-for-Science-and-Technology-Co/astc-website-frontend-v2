<template>
  <section
    :class="[
      'app-container flex flex-col bg-[#F0F0F0] pb-[150px] pt-[--header-height] font-zarid text-black lg:pb-[230px] 3xl:pb-[247px]'
    ]"
  >
    <section
      class="mt-[80px] flex flex-col justify-start gap-[83px] lg:mt-[97px] lg:gap-[126px] 3xl:mt-[123px] 3xl:gap-[166px]"
    >
      <CategoryList :title="'category'" :items="categoryItems" />
    </section>
  </section>
</template>

<script setup>
const route = useRoute()
const { $customFetch } = useNuxtApp()
const { data: categoryItems } = await useAsyncData(
  () => $customFetch(`/website/home/categories/${route.params.id}/items`),
  {
    transform: (res) => res.data || []
  }
)
</script>
<style scoped></style>
