<template>
  <section class="bg-white">
    <article
      class="app-container flex items-center justify-between gap-[200px] !pe-[210px] text-[90px] font-[200] not-italic leading-[85.5px] tracking-[0.9px] text-black"
    >
      <a href="tel:+966 11 4544158" class="cursor-default whitespace-nowrap hover:text-[#1778FF]"
        >+966 11 4544158</a
      >
      <a href="mailto:info@astc.com.sa" class="ms-[21px]">info@astc.com.sa</a>
      <div class="flex items-center gap-8">
        <a href="https://www.w3schools.com/" target="_blank">
          <XTwitterIcon :hoverColor="'#1778FF'" />
        </a>
        <a href="https://www.w3schools.com/" target="_blank">
          <LinkedinIcon :hoverColor="'#1778FF'" />
        </a>
      </div>
    </article>
    <article
      class="app-container grid w-full grid-cols-12 !pe-[100px] pb-[64px] pt-[104px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black"
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
    <!-- <article
      class="app-container flex items-start justify-between !pe-[100px] pb-[64px] pt-[104px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black"
    >
      <div class="mt-[10px] flex items-center gap-[13.8px]">
        <ASCLogoMiniIcon />
        <p class="self-end">© 2025 Arabian for Science and Technology</p>
      </div>
      <h3 class="ms-[250px] mt-[14px] max-w-[209px]">
        8101 Othman Bin Affan Street,Riyadh, Saudi Arabia
      </h3>
      <div class="mt-[14px] grid grid-flow-col grid-rows-2 gap-x-[60px] gap-y-[0px]">
        <h3 v-for="page in pages">{{ page }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <h3>Designed by</h3>
        <FedorAndWolfIcon />
        <h3>in 2025</h3>
      </div>
    </article> -->
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
