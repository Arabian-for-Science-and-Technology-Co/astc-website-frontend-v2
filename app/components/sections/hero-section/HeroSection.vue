<template>
  <section
    :class="[
      'flex min-h-[100svh] w-full flex-col justify-between gap-[105px] overflow-y-auto overflow-x-hidden pb-[103px] font-zarid text-[#465ae5]',
      'lg:gap-[162px] lg:pb-[126px]',
      '2xl:justify-start 2xl:gap-0 2xl:pb-[175px]'
    ]"
  >
    <article
      :class="[
        'app-container relative z-10 w-full pt-[152px]',
        'lg:h-fit lg:pt-[203px]',
        '2xl:h-[665px] 2xl:pt-[243px]'
      ]"
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
        :class="[
          'relative flex w-full flex-col flex-wrap items-center justify-start gap-[39px]',
          'lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-[18.6%]',
          '2xl:justify-start 2xl:gap-[338.1px]'
        ]"
      >
        <div
          :class="[
            'mb-0 hidden h-[55px] w-[106px]',
            'lg:block lg:h-[141px] lg:w-[269.91px]',
            '2xl:mb-[12px] 2xl:h-[209px] 2xl:w-[400.09px]'
          ]"
        >
          <ASCLogoMainIcon class="h-full w-full" />
        </div>

        <h2
          :class="[
            'mt-0 flex flex-col items-center gap-0 text-center text-[20px] font-normal leading-[105%] tracking-[0.3px] text-[#18264a]',
            'lg:self-end lg:text-start lg:text-[52px] lg:font-light lg:leading-[95%] lg:tracking-[0.52px]',
            '2xl:items-start'
          ]"
        >
          <span :class="['inline-block font-[400]', 'lg:font-[300]']">
            Arabian for Science and Technology Co.
          </span>

          <span :class="['inline-block font-[600]', 'lg:font-[500]']">
            Innovate Local. Impact Global.
          </span>
        </h2>
      </div>
    </article>

    <article class="relative z-10 flex-1">
      <ClientOnly>
        <ServicesSlider />
      </ClientOnly>
    </article>
  </section>
</template>

<script setup></script>
<style></style>
