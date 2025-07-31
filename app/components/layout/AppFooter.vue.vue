<template>
  <section class="bg-white">
    <article
      :class="[
        'app-container flex w-full flex-col text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-black',
        'lg:grid lg:grid-cols-12 lg:gap-y-[20px]',
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
      <div :class="['flex flex-col gap-[28px]', 'lg:col-span-4 lg:gap-[41px]', '2xl:col-span-5']">
        <a href="mailto:info@astc.com.sa">info@astc.com.sa</a>
        <h3
          class="block max-w-[230px] pe-[30px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] 2xl:hidden"
        >
          8101 Othman Bin Affan Street, Riyadh, Saudi Arabia
        </h3>
      </div>
      <div
        :class="[
          'mx-0 mt-[35px] flex items-center gap-[21px]',
          'lg:col-span-3 lg:mx-auto lg:mt-0 lg:gap-8 lg:self-start',
          '2xl:col-span-2 2xl:mx-0 2xl:gap-8 2xl:self-center'
        ]"
      >
        <a href="https://www.w3schools.com/" target="_blank">
          <XTwitterIcon class="w-[45px] lg:w-[68px]" :hoverColor="'#1778FF'" />
        </a>
        <a>
          <LinkedinIcon class="w-[45px] lg:w-[68px]" :hoverColor="'#1778FF'" />
        </a>
      </div>
    </article>
    <article
      :class="[
        'app-container flex w-full flex-col-reverse pb-[55px] pt-[110px] text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black',
        'lg:grid lg:grid-cols-12 lg:gap-y-[20px] lg:pt-[102px]',
        '2xl:pb-[64px] 2xl:pt-[104px]'
      ]"
    >
      <div
        :class="[
          'mt-[108px] flex flex-col gap-[13.8px]',
          'lg:col-span-5 lg:mt-[-25px]',
          '2xl:mt-[10px] 2xl:flex-row 2xl:items-center'
        ]"
      >
        <ASCLogoMiniIcon class="ms-[117px] lg:ms-0" />
        <p class="flex gap-[65px] lg:gap-1 2xl:self-end">
          <span>© 2025</span>
          <span class="max-w-[140px] lg:max-w-full">Arabian for Science and Technology</span>
        </p>
      </div>
      <h3 class="col-span-2 mt-[4px] hidden max-w-[230px] 2xl:mt-[14px] 2xl:block">
        8101 Othman Bin Affan Street, Riyadh, Saudi Arabia
      </h3>
      <div
        :class="[
          'pages',
          'grid-rows-col grid-col-1 grid w-fit gap-x-[0px] gap-y-[28px]',
          'lg:col-span-4 lg:mt-[4px] lg:grid lg:grid-flow-col lg:grid-rows-2 lg:gap-x-[40px] lg:gap-y-[0px]',
          'xl:gap-x-[60px]',
          '2xl:col-span-4 2xl:ms-[14px] 2xl:mt-[14px]'
        ]"
      >
        <h3
          v-for="page in pages"
          :class="[
            'text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px]',
            'lg:whitespace-nowrap lg:text-xl lg:font-normal lg:leading-[105%] lg:tracking-[0.2px]'
          ]"
        >
          {{ page }}
        </h3>
      </div>
      <div
        :class="[
          'ms-auto hidden flex-col items-center gap-[3px] text-[14px] font-[400] leading-[14.7px] tracking-[0.14px]',
          'lg:col-span-3 lg:flex',
          'xl:me-[30px]',
          '2xl:col-span-1 2xl:me-[20px]'
        ]"
      >
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
<style scoped>
.pages h3:last-child {
  @apply mt-[-28px] text-xl font-normal leading-[105%] tracking-[0.2px];
}

.pages h3:nth-last-child(2) {
  @apply text-xl font-normal leading-[105%] tracking-[0.2px];
}
</style>
