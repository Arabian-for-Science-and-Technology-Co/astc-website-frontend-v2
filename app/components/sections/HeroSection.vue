<template>
  <section class="flex h-screen flex-col">
    <article :class="['relative w-full pt-[59px]', 'xl:h-[661px] xl:pt-[150px]']">
      <video autoplay muted loop id="myVideo" :class="['absolute top-0 -z-20 w-full']">
        <source src="~/assets/Animation/main_head.mp4" type="video/mp4" />
      </video>
      <div
        :class="[
          'relative flex w-full flex-col flex-wrap items-center gap-[39px]',
          '2xl:flex-row 2xl:flex-nowrap 2xl:items-start 2xl:gap-[338.1px] 2xl:ps-[157px]'
        ]"
      >
        <div :class="['!h-[55px] !w-[106px]', 'xl:!h-[209px] xl:!w-[400.09px]']">
          <ASCLogoMainIcon class="h-full w-full" />
        </div>

        <h2
          :class="[
            'mt-[39px] w-full max-w-[763px] text-center text-[30px] font-[400] leading-[105%] tracking-[0.3px] text-[#18264A]',
            'xl:mt-[calc(272px-150px)] xl:whitespace-nowrap xl:text-start xl:text-[52px] xl:font-[300] xl:leading-[95%] xl:tracking-[1%]'
          ]"
        >
          <span
            :class="[
              'text-[30px] font-[400] leading-[105%] tracking-[0.3px] text-[#18264A]',
              'xl:text-[52px] xl:font-[300] xl:leading-[95%] xl:tracking-[1%]'
            ]"
          >
            Arabian for Science and Technology Co.
          </span>

          <br />
          <span class="mt-4 block font-[500]"> Innovate Local. Impact Global. </span>
        </h2>
      </div>
    </article>
    <article class="me-[69px] ms-[66px]">
      <h2 class="text-[24px] font-semibold leading-[25px] tracking-[1%] text-[#465AE5]">
        Now Introducing
      </h2>
      <div
        class="mt-2 flex items-center justify-between py-1.5 text-[52px] font-[300] leading-[49px] tracking-[1%] text-[#465AE5]"
      >
        <h3 class=" ">New Strategy. New Identity. New Website.</h3>
        <h3 class=" ">Soon</h3>
      </div>
      <div class="mt-4 py-1">
        <div class="flex flex-col gap-[9px]">
          <AnimatedDots v-for="i in 13" :delay="0" />
        </div>
        <!-- <div class="lottie-container">
          <LottieAnimation
            :animation-data="saudiVisionAnimation"
            :loop="true"
            :autoplay="true"
            width="1"
            height="fit-content"
            class="text-[#6F80F5]"
            color="#00ff00"
          />
        </div> -->
      </div>
    </article>
  </section>
</template>

<script setup>
import Container from '~/components/layout/Container.vue'
import ASCLogoMain from '~/assets/Icons/ASC_Logo_Main.svg'
import saudiVisionAnimation from '~/assets/Animation/saudi_vision_progressbar.json'
const animationData = ref(null) // Your animation JSON data

async function loadAnimation() {
  const response = await fetch('~/assets/Animation/saudi_vision_progressbar.json')
  animationData.value = await response.json()
}

loadAnimation()
</script>
<style scoped>
.lottie-container {
  margin: 0 auto;
  max-width: 600px;
}
</style>
