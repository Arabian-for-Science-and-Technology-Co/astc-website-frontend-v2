<template>
  <section
    class="app-container relative flex items-stretch !overflow-hidden overflow-y-auto bg-[#0D1667] font-zarid  "
  >
    <article
      :class="[
        'relative z-10 w-full pb-[94px] pt-[70px]',
        'lg:pb-[102px] lg:pt-[100px]',
        '3xl:pb-[206px] 3xl:pt-[190px]'
      ]"
    >
      <h2
        :class="[
          'mb-[23px] text-[48px] font-[200] not-italic leading-[normal] tracking-[0.48px] text-white',
          'lg:mb-[37px] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
          '3xl:mb-[43px] 3xl:text-[140px] 3xl:leading-[133px] 3xl:tracking-[1.4px]'
        ]"
      >
        Saudi Vision 2030
      </h2>
      <p
        :class="[
          'mb-[61px] w-[70%] text-[20px] font-[200] not-italic leading-[24px] tracking-[0.2px] text-white',
          'lg:mb-[145px] lg:w-[85%] lg:text-[52px] lg:leading-[49.4px] lg:tracking-[0.52px]',
          '3xl:mb-[141px]'
        ]"
      >
        Keep progressing!
      </p>
      <div
        :class="['relative mb-[81px] max-w-full !overflow-hidden', 'lg:mb-[65px]', '3xl:mb-[74px]']"
      >
        <AnimatedGridsSection color="white" />
        <Vision2030Icon
          :class="[
            'absolute end-0 top-[50%] z-10 w-[99px] -translate-y-[50%]',
            'lg:end-[52px] lg:w-[238px]'
          ]"
        />
      </div>
      <button
        class="w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-base font-normal not-italic leading-[normal] tracking-[0.2px] text-black transition-colors hover:bg-white/70"
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
