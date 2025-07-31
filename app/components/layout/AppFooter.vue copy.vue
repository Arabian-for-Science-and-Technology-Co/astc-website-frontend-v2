<template>
  <section class="bg-white">
    <article
      :class="[
        'app-container grid grid-cols-12 font-[200] not-italic text-black',
        'lg:text-[52px] lg:leading-[49.4px] lg:tracking-[0.52px]',
        '2xl:text-[90px] 2xl:leading-[85.5px] 2xl:tracking-[0.9px]'
      ]"
    >
      <a
        dir="ltr"
        href="tel:+966 11 4544158"
        class="col-span-5 cursor-default whitespace-nowrap hover:text-[#1778FF]"
      >
        +966 11 4544158
      </a>
      <a href="mailto:info@astc.com.sa" class="col-span-3">info@astc.com.sa</a>
      <div class="col-span-3 flex items-center gap-8 2xl:gap-8">
        <a href="https://www.w3schools.com/" target="_blank">
          <XTwitterIcon :hoverColor="'#1778FF'" />
        </a>
        <a href="https://www.w3schools.com/" target="_blank">
          <LinkedinIcon :hoverColor="'#1778FF'" />
        </a>
      </div>
    </article>
    <article
      class="app-container grid w-full grid-cols-12 pb-[64px] pt-[104px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black"
    >
      <div class="col-span-5 mt-[10px] flex items-center gap-[13.8px]">
        <ASCLogoMiniIcon />
        <p class="self-end">© 2025 Arabian for Science and Technology</p>
      </div>
      <h3 class="col-span-2 mt-[14px] pe-[30px]">
        8101 Othman Bin Affan Street, Riyadh, Saudi Arabia
      </h3>
      <div
        class="col-span-4 mx-[50px] mt-[14px] grid w-fit grid-flow-col grid-rows-2 gap-x-[60px] gap-y-[0px]"
      >
        <h3 v-for="page in pages">{{ page }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <h3>Designed by</h3>
        <FedorAndWolfIcon />
        <h3>in 2025</h3>
      </div>
    </article>
  </section>
</template>

<script setup>
const pages = [
  'Products & Solutions',
  'News',
  'About',
  'Contact',
  'Privacy Policy',
  'Terms & Conditions'
]
</script>
