<template>
  <div
    id="contact"
    :class="['flex flex-col bg-[#F0F0F0] pt-[--header-height] font-zarid text-black']"
  >
    <section
      class="app-container font-section mb-[125px] mt-[172px] flex w-fit flex-col gap-[74px] lg:mb-[153px] lg:mt-[172px] lg:gap-[82px] 3xl:ms-[254px]"
    >
      <article class="" v-for="info in informations">
        <h2
          :class="[
            'mb-[20px] text-[18px] font-[500] leading-[normal] tracking-[0.18px] !no-underline',
            'lg:mb-0 lg:text-[30px] lg:font-[600] lg:leading-[33px] lg:tracking-[0.3px]'
          ]"
        >
          {{ info.title }}
        </h2>
        <div class="flex max-w-[840px] flex-col items-start gap-0">
          <h3
            v-for="item in info.items"
            :class="[
              'text-[36px] font-[300] not-italic leading-[48.6px] tracking-[0.36px] text-[#18264A] !no-underline',
              'lg:font-[200]',
              'xl:text-[90px] xl:leading-[85.5px] xl:tracking-[0.9px]'
            ]"
          >
            {{ item }}
          </h3>
        </div>
        <BaseButton
          v-if="info.id == 'address'"
          @click="navigateTo(`/contact`)"
          class="mt-[23px] block !max-w-[242px] lg:hidden"
        >
          <h3 class="flex w-full items-center justify-start gap-[30px] px-[33px] text-[16px]">
            <LocationIcon />
            {{ $t('build_route') }}
          </h3>
        </BaseButton>
      </article>
    </section>
    <section>
      <div class="ms-[--container-ps] w-full overflow-x-auto rounded-t-3xl lg:mx-auto lg:w-fit">
        <Tabs
          :returnObject="false"
          :class="['rounded-b-none bg-white']"
          v-model="mapType"
          :tabs="mapTypes"
        >
          <template #tab="{ tab }">
            <h2 v-if="tab.value == 'nearest-metro-station'" class="flex items-center gap-[8px]">
              <NearestIcon />
              {{ tab.label }}
            </h2>
            <h2 v-else>{{ tab.label }}</h2>
          </template>
        </Tabs>
      </div>
      <div class="h-[calc(100vh-68px)] max-h-[1106px]">
        <ContactMap :center="position" :zoom="12" :markers="[position]" :type="mapType" />
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const { getPage } = usePages()
const contactPage = getPage('contact')
useCustomHead(() => ({
  title: contactPage?.[`meta_title_${locale.value}`],
  description: contactPage?.[`meta_description_${locale.value}`],
  keywords: contactPage?.[`meta_keywords_${locale.value}`]
}))

const { settings } = useWebsiteSettings()
const informations = computed(() => [
  {
    id: 'contact',
    title: t('contact'),
    items: [...settings.value?.phones, settings.value?.mail]
  },
  {
    id: 'address',
    title: t('address'),
    items: [settings.value?.[`address_${locale.value}`]]
  }
])
const mapTypes = computed(() => [
  { label: t('map'), value: 'map' },
  {
    label: t('get_from_airport'),
    value: 'get-from-the-airport'
  },
  { label: t('hotels_around'), value: 'hotels-around' },
  { label: t('nearest_metro_station'), value: 'nearest-metro-station' }
])
const mapType = ref(mapTypes.value[0].value)
const position = computed(() => ({
  lat: Number(settings.value?.latitude),
  lng: Number(settings.value?.longitude)
  // lat: Number(24.7496182),
  // lng: Number(46.7230664),
}))
const airportPosition = {
  lat: Number(24.9454935),
  lng: Number(46.7089092)
}
</script>
<style>
#contact .font-section {
  font-family: Roboto !important;
}

@media (min-width: 1024px) {
  #contact .font-section {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif !important;
  }
}
</style>
