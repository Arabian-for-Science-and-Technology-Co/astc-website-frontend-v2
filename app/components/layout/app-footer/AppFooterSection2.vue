<template>
  <article
    :class="[
      'app-container flex w-full flex-col-reverse text-xl font-normal not-italic leading-[105%] tracking-[0.2px] text-black',
      'lg:grid lg:grid-cols-12 lg:gap-y-[20px]'
    ]"
  >
    <div
      :class="[
        'mt-[108px] flex flex-col gap-[13.8px]',
        'lg:col-span-5 lg:mt-[-25px]',
        '3xl:mt-[10px] 3xl:flex-row 3xl:items-center'
      ]"
    >
      <ASCLogoMiniIcon class="ms-[31.2vw] lg:ms-0" />
      <p class="flex gap-[17.34vw] lg:gap-1 3xl:self-end">
        <span>© 2025</span>
        <span class="max-w-[140px] lg:max-w-full">{{ settings?.[`title_${locale}`] }}</span>
      </p>
    </div>
    <h3 class="col-span-2 mt-[4px] hidden max-w-[230px] 3xl:mt-[14px] 3xl:block">
      {{ settings?.[`address_${locale}`] }}
    </h3>
    <div
      :class="[
        'pages',
        'grid-rows-col grid-col-1 grid w-fit gap-x-[0px] gap-y-[28px]',
        'lg:col-span-4 lg:mt-[4px] lg:grid lg:grid-flow-col lg:grid-rows-2 lg:gap-x-[40px] lg:gap-y-[0px]',
        'xl:gap-x-[60px]',
        '3xl:col-span-4 3xl:ms-[14px] 3xl:mt-[14px]'
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
        '3xl:col-span-1 3xl:me-[20px]'
      ]"
    >
      <h3>Designed by</h3>
      <FedorAndWolfIcon />
      <h3>in 2025</h3>
    </div>
  </article>
</template>

<script setup>
defineProps({
  pages: { type: Array, required: true }
})
const { locale } = useI18n()
const { settings } = useWebsiteSettings()
</script>
<style scoped>
.pages h3:last-child {
  @apply mt-[-28px] text-xl font-normal leading-[105%] tracking-[0.2px];
  @apply lg:mt-[0px];
}

.pages h3:nth-last-child(2) {
  @apply text-xl font-normal leading-[105%] tracking-[0.2px];
}
</style>
