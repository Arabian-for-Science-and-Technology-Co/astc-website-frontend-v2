<template>
  <div class="app-container app-container--edit mt-[100px] lg:mt-[180px] 3xl:mt-[184px]">
    <h2
      v-if="data?.[`title_${locale}`]"
      :class="[
        'text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
        'lg:max-w-[70%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]'
      ]"
    >
      {{ data?.[`title_${locale}`] }}
    </h2>
    <div
      v-if="data?.[`content_${locale}`]"
      :class="[
        'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
        'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
      ]"
    >
      {{ data?.[`content_${locale}`] }}
    </div>
    <BaseButton
      v-if="data?.cta_link"
      :class="[
        'font-section mt-[40px] h-[68px] max-w-[295px] text-[16px] font-[500] leading-[normal] lg:mt-[95px]',
        'lg:mt-[95px] lg:text-[20px] lg:font-[400] lg:leading-[21px] lg:tracking-[0.2px]'
      ]"
    >
      {{ data?.[`cta_text_${locale}`] }}
    </BaseButton>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, default: () => ({}) }
})
const { locale } = useI18n()
</script>
<style>
.app-container--edit {
  @media (min-width: 1600px) {
    padding-inline-start: 438px;
    padding-inline-end: 586px;
  }
}
.font-section {
  font-family: Roboto !important;
}

@media (min-width: 1024px) {
  .font-section {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif !important;
  }
}
</style>
