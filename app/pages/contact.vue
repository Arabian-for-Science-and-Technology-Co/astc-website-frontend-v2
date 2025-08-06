<template>
  <div
    id="contact"
    :class="['flex flex-col bg-[#F0F0F0] pt-[--header-height] font-zarid text-black']"
  >
    <section
      class="app-container mb-[125px] mt-[172px] flex w-fit flex-col gap-[74px] lg:mb-[153px] lg:mt-[172px] lg:gap-[82px] 3xl:ms-[254px]"
    >
      <article class="" v-for="info in informations">
        <h2
          :class="[
            'main-title mb-[20px] text-[18px] font-[500] leading-[normal] tracking-[0.18px]',
            'lg:mb-0 lg:text-[30px] lg:font-[600] lg:leading-[33px] lg:tracking-[0.3px]'
          ]"
        >
          {{ info.title }}
        </h2>
        <div class="flex max-w-[840px] flex-col items-start gap-0">
          <h3
            v-for="item in info.items"
            :class="[
              'text-[36px] font-[200] not-italic leading-[48.6px] tracking-[0.36px] text-[#18264A]',
              'xl:text-[90px] xl:leading-[85.5px] xl:tracking-[0.9px]'
            ]"
          >
            {{ item }}
          </h3>
        </div>
      </article>
    </section>
    <article>
      <Tabs
        :returnObject="false"
        :class="['mx-auto rounded-b-none bg-white']"
        v-model="mapType"
        :tabs="mapTypes"
      >
        <template #tab="{ tab }">
          <h2 class=" ">{{ tab }}</h2>
        </template>
      </Tabs>
      <div class="h-screen max-h-[1106px]">
        <BaseMap :center="{ lat: 40.7128, lng: -74.006 }" :zoom="12" />
      </div>
    </article>
  </div>
</template>

<script setup>
const { settings } = useWebsiteSettings()
const { t, locale } = useI18n()
const informations = computed(() => [
  {
    title: t('contact'),
    items: [...settings.value?.phones, settings.value?.mail]
  },
  {
    title: t('address'),
    items: [settings.value?.[`address_${locale.value}`]]
  }
])
const mapTypes = ['Map', 'Get from the airport', 'Hotels around', 'Nearest metro station']
const mapType = ref(mapTypes[0])
</script>
<style>
#contact .main-title {
  font-family: Roboto;
}

@media (min-width: 1024px) {
  #contact .main-title {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif;
  }
}
</style>
