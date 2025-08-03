<template>
  <section
    :class="[
      'app-container bg-[#F0F0F0] pb-[127px] pt-[100px] font-zarid',
      'lg:pb-[127px] lg:pt-[110px]',
      '3xl:pb-[163px] 3xl:pt-[190px]'
    ]"
  >
    <h2
      :class="[
        'main-text-color max-w-[85%] text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px]',
        'lg:max-w-[75%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
        '3xl:max-w-[80%] 3xl:text-[140px] 3xl:leading-[133px] 3xl:tracking-[1.4px]'
      ]"
    >
      Contributing to the Saudi future with delivering fully local technologies
    </h2>
    <button
      :class="[
        'mt-[80px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-xl font-[400] not-italic leading-[21px] tracking-[0.2px] text-black transition-colors hover:bg-white/70',
        '3xl:mt-[100px]'
      ]"
    >
      About Us
    </button>
  </section>
</template>

<script setup>
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
onMounted(() => {
  console.log('props.sectionData', props.sectionData)
})
</script>
<style scoped>
.main-text-color {
  background: linear-gradient(265deg, #465ae5 13.12%, #3246a9 97.6%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
