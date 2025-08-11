<template>
  <div
    :class="[
      'bg flex min-h-screen flex-col bg-[#0D1667] pb-[209px] pt-[--header-height] font-zarid text-white lg:pb-[300px] 3xl:pb-[280px]'
    ]"
  >
    <BaseModal
      v-model:open="modalOpen"
      containerClass="w-full !mx-0 max-w-[310px] sm:max-w-[500px] 3xl:!max-w-[612px] !bg-transparent"
      bodyClass="sm:!px-0 px-[30px] flex justify-center items-center  !py-0"
      :canCloseByBackdrop="true"
      :canCloseByEsc="true"
    >
      <ClickZoom
        img-class="max-h-[85vh]"
        :src="selectedCertificate.image"
        :tap-zoom="2.5"
        :max-scale="5"
      />
    </BaseModal>
  </div>
</template>

<script setup>
definePageMeta({
  layoutProps: {
    isWhiteLogo: true,
    selectedTabClass: 'bg-[#0D1667] text-white'
  }
})
const selectedCertificate = ref(null)
const modalOpen = ref(false)
const { locale } = useI18n()
const customFetch = useCustomFetch()
const { data: aboutData } = useAsyncData(() => customFetch(`/website/home/page/2/sections`), {
  transform: (res) => res.data || []
})
const { data: certificates } = useAsyncData(() => customFetch(`/website/home/certificates`), {
  transform: (res) => res.data || []
})
const aboutIntro = computed(() => aboutData.value?.find((d) => d?.code == 'about_intro'))
const certificatesSlider = computed(() =>
  aboutData.value?.find((d) => d?.code == 'certificates_slider')
)
</script>
<style scoped>
.bg {
  background:
    linear-gradient(191deg, rgba(13, 22, 103, 0) 23.08%, #0d1667 70.2%),
    url('~/assets/images/about/background.jpg');
}
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
