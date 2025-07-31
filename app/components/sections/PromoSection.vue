<template>
  <section
    class="flex min-h-screen flex-col items-stretch overflow-hidden bg-[#0D1667] font-zarid lg:flex-row"
  >
    <article
      :class="[
        'app-container flex-1 pb-[80px] pt-[70px]',
        'lg:pb-[118px] lg:pt-[100px]',
        '2xl:pb-[180px] 2xl:pt-[190px]'
      ]"
    >
      <h2
        :class="[
          'text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-white',
          'lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
          '2xl:text-[140px] 2xl:leading-[133px] 2xl:tracking-[1.4px]'
        ]"
      >
        Custom Development
      </h2>
      <p
        :class="[
          'mt-[37px] w-[70%] text-[20px] font-[200] not-italic leading-[21px] tracking-[0.2px] text-white',
          'lg:mt-[80px] lg:w-[90%] lg:text-[52px] lg:leading-[49.4px] lg:tracking-[0.52px]'
        ]"
      >
        With a relentless focus on technological advancement, ASTC leads the way in transforming
        industries and driving progress
      </p>
      <button
        :class="[
          'mt-[70px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black transition-colors hover:bg-white/70',
          'lg:mt-[100px]'
        ]"
      >
        More details...
      </button>
    </article>
    <img :src="promoImg" :class="['w-full object-cover', 'lg:w-1/3', '2xl:w-1/2']" />
  </section>
</template>

<script setup>
import promoImg from '~/assets/Images/main/promo.png'
</script>
<style scoped>
.main-text-color {
  background: linear-gradient(265deg, #465ae5 13.12%, #3246a9 97.6%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
