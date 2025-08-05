<template>
  <article
    :class="[
      'app-container flex w-full flex-col text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-black',
      'lg:grid lg:grid-cols-12 lg:gap-y-[20px]',
      '3xl:text-[90px] 3xl:leading-[85.5px] 3xl:tracking-[0.9px]'
    ]"
  >
    <a
      dir="ltr"
      href="tel:+966 11 4544158"
      class="col-span-5 cursor-default whitespace-nowrap hover:text-[#1778FF]"
    >
      +966 11 4544158
    </a>
    <div :class="['flex flex-col gap-[28px]', 'lg:col-span-4 lg:gap-[41px]', '3xl:col-span-5']">
      <a href="mailto:info@astc.com.sa">info@astc.com.sa</a>
      <h3
        class="block max-w-[230px] pe-[30px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] 3xl:hidden"
      >
        8101 Othman Bin Affan Street, Riyadh, Saudi Arabia
      </h3>
    </div>
    <div
      :class="[
        'mx-0 mt-[35px] flex items-center gap-[21px]',
        'lg:col-span-3 lg:mx-auto lg:mt-0 lg:gap-8 lg:self-start',
        '3xl:col-span-2 3xl:mx-0 3xl:gap-8 3xl:self-center'
      ]"
    >
      <a href="https://www.w3schools.com/" target="_blank">
        <XTwitterIcon class="w-[45px] lg:w-[68px]" :color="themeColor" :hoverColor="'#1778FF'" />
      </a>
      <a>
        <LinkedinIcon class="w-[45px] lg:w-[68px]" :color="themeColor" :hoverColor="'#1778FF'" />
      </a>
    </div>
  </article>
</template>

<script setup>
defineProps({
  themeColor: { type: String, required: true }
})
</script>
<style scoped></style>
