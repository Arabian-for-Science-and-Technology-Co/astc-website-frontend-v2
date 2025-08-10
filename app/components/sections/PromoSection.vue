<template>
  <section
    class="flex min-h-screen flex-col items-stretch overflow-hidden bg-[#0D1667] font-zarid lg:flex-row"
  >
    <article
      :class="[
        'app-container flex-1 pb-[80px] pt-[70px]',
        'lg:pb-[118px] lg:pt-[100px]',
        '3xl:pb-[180px] 3xl:pt-[190px]'
      ]"
    >
      <h2
        :class="[
          'text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-white',
          'lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
          '3xl:text-[140px] 3xl:leading-[133px] 3xl:tracking-[1.4px]'
        ]"
      >
        {{ sectionData?.[`title_${locale}`] }}
      </h2>
      <p
        :class="[
          'mt-[37px] w-[70%] text-[20px] font-[200] not-italic leading-[21px] tracking-[0.2px] text-white',
          'lg:mt-[80px] lg:w-[90%] lg:text-[52px] lg:leading-[49.4px] lg:tracking-[0.52px] rtl:lg:leading-[60px]'
        ]"
      >
        {{ sectionData?.[`content_${locale}`] }}
      </p>
      <button
        @click="navigateTo(`/${sectionData?.cta_link}`)"
        :class="[
          'mt-[70px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black transition-colors hover:bg-white/70',
          'lg:mt-[100px]'
        ]"
      >
        {{ sectionData?.[`cta_text_${locale}`] }}
      </button>
    </article>
    <BaseImg
      densities="x1 x2"
      format="webp"
      :src="sectionData?.image || promoImg"
      :class="['max-h-[312px] w-full object-cover', 'lg:max-h-full lg:w-1/3', '3xl:w-1/2']"
      :alt="`Image representing promoImg`"
      loading="lazy"
      decoding="async"
      :fallback="promoImg"
    />
  </section>
</template>

<script setup>
const promoImg = 'promo.png'
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
const { locale } = useI18n()
</script>
<style scoped>
.main-text-color {
  background: linear-gradient(265deg, #465ae5 13.12%, #3246a9 97.6%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
