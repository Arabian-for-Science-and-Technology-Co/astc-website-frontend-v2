<template>
  <figure
    @click="navigateTo(`/product-details/${data?.slug}`)"
    :class="['imgs-contianer__card', wide && 'imgs-contianer__card--wide']"
  >
    <BaseImg
      densities="x1 x2"
      format="webp"
      :key="data?.id"
      :src="data?.image || data?.image_url"
      :class="['imgs-contianer__card__img', wide && 'imgs-contianer__card__img--wide']"
      :alt="`Image ${data?.id} representing solution`"
      loading="lazy"
      decoding="async"
    />
    <figcaption class="w-full">
      <h3 v-if="data?.[`title_${locale}`]" class="imgs-contianer__card__title">
        {{ data?.[`title_${locale}`] }}
      </h3>
      <p
        v-if="data?.[`meta_desc_${locale}`]"
        :class="['imgs-contianer__card__desc', wide && 'imgs-contianer__card__desc--wide']"
      >
        {{ data?.[`meta_desc_${locale}`] }}
      </p>
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
</style>
