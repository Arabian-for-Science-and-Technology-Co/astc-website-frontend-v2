<template>
  <section class="flex h-screen items-stretch overflow-y-auto bg-[#0D1667] font-zarid">
    <article class="app-container flex-1 pb-[180px] pt-[190px]">
      <h2 class="text-[140px] font-[200] not-italic leading-[133px] tracking-[1.4px] text-white">
        Custom Development
      </h2>
      <p
        class="mt-[80px] w-[85%] text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-white"
      >
        With a relentless focus on technological advancement, ASTC leads the way in transforming
        industries and driving progress
      </p>
      <button
        class="mt-[100px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black transition-colors hover:bg-white/70"
      >
        More details...
      </button>
    </article>
    <img :src="promoImg" class="h-full flex-1 object-cover" />
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
