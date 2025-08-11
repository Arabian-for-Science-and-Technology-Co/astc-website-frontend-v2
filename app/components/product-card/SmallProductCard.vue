<template>
  <figure
    @click="navigateTo(`/product-details/${data?.slug}`)"
    :class="['imgs-contianer__card', wide && 'imgs-contianer__card--wide']"
  >
    <BaseImg
      densities="x1 x2"
      format="webp"
      :key="data?.id"
      :src="data?.image"
      :class="['imgs-contianer__card__img']"
      :alt="`Image ${data?.id} representing solution`"
      loading="lazy"
      decoding="async"
    />
    <figcaption class="w-full">
      <h3 v-if="data?.[`title_${locale}`]" class="imgs-contianer__card__title">
        {{ data?.[`title_${locale}`] }}
      </h3>
      <!-- <p
        v-if="data?.[`meta_desc_${locale}`]"
        :class="['imgs-contianer__card__desc', wide && 'imgs-contianer__card__desc--wide']"
      >
        {{ data?.[`meta_desc_${locale}`] }}
      </p> -->
    </figcaption>
  </figure>
</template>

<script setup>
defineProps({
  data: { type: Object, default: () => ({}) },
  wide: { type: Boolean, default: false }
})
const { locale } = useI18n()
</script>
<style scoped>
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
/*------------------* */
.imgs-contianer__card__desc {
  @apply mt-[3px] w-full px-0 text-center text-xl font-[400] not-italic leading-[21px] tracking-[0.2px];
  @apply lg:mt-[17px] lg:px-2;
}
</style>
