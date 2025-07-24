<template>
  <section
    class="font-zarid app-container flex h-[100svh] w-full flex-col justify-between gap-0 overflow-y-auto overflow-x-hidden text-[#465ae5] xl:gap-[50px] 2xl:justify-start 2xl:gap-0"
  >
    <article class="relative w-full pt-[58px] xl:h-fit xl:pt-[58px] 2xl:h-[661px] 2xl:pt-[150px]">
      <video
        autoplay
        muted
        loop
        id="myVideo"
        class="absolute left-1/2 top-0 -z-20 max-h-screen w-[150%] -translate-x-1/2 xl:w-full"
      >
        <source src="~/assets/Animation/main_head.mp4" type="video/mp4" />
      </video>

      <div
        class="relative flex w-full flex-col flex-wrap items-center justify-start gap-[39px] xl:flex-row xl:flex-nowrap xl:items-start xl:justify-center xl:gap-[100px] xl:ps-0 2xl:justify-start 2xl:gap-[338.1px] 2xl:ps-[93px]"
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

    <article class="mb-[47.52px] mt-[96px] xl:mb-[10px] xl:mt-[20px] 2xl:mb-[69.07px] 2xl:mt-0">
      <h2
        class="text-[18px] font-semibold leading-[105%] tracking-[0.18px] xl:text-[24px] xl:tracking-[0.24px]"
      >
        Now Introducing
      </h2>

      <div class="my-component">
        <h3
          class="m-0 max-w-[150px] text-[30px] font-normal leading-[105%] tracking-[0.3px] xl:max-w-none xl:text-[40px] xl:font-light xl:leading-[95%] xl:tracking-[0.52px] 2xl:text-[52px]"
        >
          New Strategy. New Identity. New Website.
        </h3>
        <h3
          class="m-0 text-[30px] font-normal leading-[105%] tracking-[0.3px] xl:text-[40px] xl:font-light xl:leading-[95%] xl:tracking-[0.52px] 2xl:text-[52px]"
        >
          Soon
        </h3>
      </div>
      <h1>{{ $t('form.ok') }}</h1>
      <ClientOnly>
        <AnimatedGridsSection />
      </ClientOnly>
    </article>
  </section>
</template>

<script setup></script>
<style>
.my-component {
  @apply mt-[5px] flex items-end justify-between;

  @screen xl {
    @apply mt-[8px] items-center;
  }
}
</style>
