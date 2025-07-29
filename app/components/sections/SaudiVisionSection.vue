<template>
  <section
    class="app-container relative flex h-screen items-stretch !overflow-hidden overflow-y-auto bg-[#0D1667] font-zarid"
  >
    <article class="relative z-10 w-full pb-[206px] pt-[190px]">
      <h2 class="text-[140px] font-[200] not-italic leading-[133px] tracking-[1.4px] text-white">
        Saudi Vision 2030
      </h2>
      <p
        class="mt-[43px] w-[85%] text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-white"
      >
        Keep progressing!
      </p>
      <div class="relative mt-[141px] max-w-full !overflow-hidden">
        <AnimatedGridsSection color="white" />
        <Vision2030Icon class="absolute top-[50%] z-10 end-[52px] -translate-y-[50%]" />
      </div>
      <button
        class="mt-[71px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black transition-colors hover:bg-white/70"
      >
        Discover Our Vision
      </button>
    </article>
    <img :src="saudiVisionImg" class="absolute start-0 top-0 -z-0 h-full w-full object-cover" />
  </section>
</template>

<script setup>
import saudiVisionImg from '~/assets/Images/main/saudi_vision.png'
</script>
<style scoped>
.main-text-color {
  background: linear-gradient(265deg, #465ae5 13.12%, #3246a9 97.6%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
