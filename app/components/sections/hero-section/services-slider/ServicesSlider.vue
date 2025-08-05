<template>
  <SliderCarousel
    class="h-full"
    trackClass="app-container flex h-full items-stretch justify-start lg:gap-[40px] gap-[28.67px]   "
  >
    <figure
      v-for="(category, index) in categories"
      :key="category.id"
      :class="[
        'group relative h-full w-[258px] shrink-0 overflow-hidden rounded-[34px] bg-gray-950',
        'lg:w-[360px] lg:rounded-[48px]'
      ]"
    >
      <BaseImg
        densities="x1 x2"
        format="webp"
        :src="category.image"
        class="h-full w-full object-cover transition-transform group-hover:scale-110"
        :alt="`Image representing service`"
        loading="eager"
      />
      <figcaption
        :class="[
          'absolute top-0 z-10 flex h-full w-full flex-col justify-between px-[28.67px] pb-[28.67px] pt-[32px]',
          'lg:px-[40px] lg:pb-[40px] lg:pt-[45px]'
        ]"
      >
        <h3
          :class="['text-[52px] font-[300] not-italic leading-[95%] tracking-[0.52px] text-white']"
        >
          {{ category?.[`title_${locale}`] }}
        </h3>
        <button
          @click="navigateTo(`categories-details/${category.id}`)"
          :class="[
            'w-full rounded-[17.201px] bg-[#FFFFFF1A] pb-[15.25px] pt-[12.48px] text-center text-[18px] font-normal not-italic leading-[105%] tracking-[0.2px] text-white backdrop-blur-[17px]',
            'lg:rounded-3xl lg:pb-[24px] lg:pt-[23px] lg:text-[20px]'
          ]"
        >
          {{ $t('explore') }}
        </button>
      </figcaption>
    </figure>
  </SliderCarousel>
</template>

<script setup>
const { $customFetch } = useNuxtApp()
const { locale } = useI18n()
const { data: categories } = await useAsyncData(() => $customFetch('/website/home/categories'), {
  transform: (res) => res.data || []
})
</script>
<style></style>
