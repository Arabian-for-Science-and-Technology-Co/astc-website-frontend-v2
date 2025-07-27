<template>
  <section
    class="app-container flex min-h-[100svh] w-full flex-col justify-between gap-0 overflow-y-auto overflow-x-hidden font-zarid text-[#465ae5] xl:gap-[50px] 2xl:justify-start 2xl:gap-0"
  >
    <article
      class="relative z-10 w-full pt-[58px] xl:h-fit xl:pt-[58px] 2xl:h-[665px] 2xl:pt-[243px]"
    >
      <video
        autoplay
        muted
        loop
        id="myVideo"
        class="absolute left-1/2 top-0 -z-10 max-h-screen w-[150%] -translate-x-1/2 xl:w-full"
      >
        <source src="~/assets/Animation/main_head.mp4" type="video/mp4" />
      </video>

      <div
        class="relative flex w-full flex-col flex-wrap items-center justify-start gap-[39px] xl:flex-row xl:flex-nowrap xl:items-start xl:justify-center xl:gap-[100px] 2xl:justify-start 2xl:gap-[338.1px]"
      >
        <div
          class="mb-0 h-[55px] w-[106px] xl:h-[150px] xl:w-[300px] 2xl:mb-[12px] 2xl:h-[209px] 2xl:w-[400.09px]"
        >
          <ASCLogoMainIcon class="h-full w-full" />
        </div>

        <h2 class="mt-0 flex flex-col items-center gap-[18px] xl:gap-0 xl:self-end 2xl:items-start">
          <span
            class="inline-block w-[300px] text-center text-[30px] font-normal leading-[105%] tracking-[0.3px] text-[#18264a] xl:w-auto xl:text-start xl:text-[40px] xl:font-light xl:leading-[95%] xl:tracking-[0.52px] 2xl:text-[52px]"
          >
            Arabian for Science and Technology Co.
          </span>

          <span
            class="inline-block w-[200px] text-center text-[30px] font-semibold leading-[105%] tracking-[0.3px] text-[#18264a] xl:w-auto xl:text-start xl:text-[40px] xl:font-medium xl:leading-[95%] xl:tracking-[0.52px] 2xl:text-[52px]"
          >
            Innovate Local. Impact Global.
          </span>
        </h2>
      </div>
    </article>

    <article class="relative z-10">
      <ServicesSlider />
    </article>
  </section>
</template>

<script setup></script>
<style></style>
