<template>
  <div
    :class="[
      'bg flex min-h-screen flex-col bg-[#0D1667] pb-[209px] pt-[--header-height] font-zarid text-white lg:pb-[300px] 3xl:pb-[280px]'
    ]"
  >
    <img
      :src="aboutIntro?.image"
      class="mx-[7px] mt-[73px] lg:mx-[80px] lg:mt-[43px] 3xl:mx-[247px] 3xl:mt-[69px]"
      alt=""
    />
    <div class="app-container app-container--edit mt-[68px] lg:mt-[62px] 3xl:mt-[104px]">
      <h2
        :class="[
          'text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
          'lg:max-w-[70%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]'
        ]"
      >
        {{ aboutIntro?.[`title_${locale}`] }}
      </h2>
      <p
        :class="[
          'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
          'lg:mt-[57px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
        ]"
      >
        <span class="block">
          {{ aboutIntro?.[`content_${locale}`]?.split(',')?.[0] }}
        </span>
        <span class="block">
          {{ aboutIntro?.[`content_${locale}`]?.split(',')?.[1] }}
        </span>
        <span class="block">
          {{ aboutIntro?.[`content_${locale}`]?.split(',')?.[2] }}
        </span>
      </p>
      <h2
        :class="[
          'mt-[91px] text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
          'lg:mt-[180px] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
          'lg:mt-[171px]'
        ]"
      >
        {{ visionStatement?.[`title_${locale}`]?.split('—')?.[0] }} —
        <br />
        {{ visionStatement?.[`title_${locale}`]?.split('—')?.[1] }}
      </h2>
    </div>
    <div class="mt-[100px] lg:mt-[180px]">
      <h2
        :class="[
          'app-container app-container--edit max-w-[264px] text-[30px] font-[600] leading-[110%] tracking-[0.3px]',
          'lg:max-w-full'
        ]"
      >
        {{ certificatesSlider?.[`title_${locale}`] }}
      </h2>
      <ScrollWithDragWrapper
        class="mt-[49px] pe-[--container-pe] ps-[--container-ps] lg:mt-[53px] lg:pe-0 lg:ps-0"
      >
        <div
          class="grid auto-cols-max grid-flow-col grid-rows-2 items-end gap-[30px] lg:grid-rows-1"
        >
          <img
            v-for="certificate in certificates"
            @click="
              () => {
                modalOpen = true
                selectedCertificate = certificate
              }
            "
            :key="certificate.id"
            :src="certificate.image"
            class="inline-block h-auto w-auto max-w-[205px] object-contain align-bottom"
            alt=""
          />
        </div>
      </ScrollWithDragWrapper>
    </div>
    <div class="app-container app-container--edit mt-[100px] lg:mt-[180px] 3xl:mt-[184px]">
      <h2
        :class="[
          'text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
          'lg:max-w-[70%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]'
        ]"
      >
        {{ aboutGoals?.[`title_${locale}`] }}
      </h2>
      <div
        :class="[
          'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
          'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
        ]"
      >
        <p>
          {{ aboutGoals?.[`content_${locale}`] }}
        </p>
        <ul class="w-[90%] list-outside list-disc space-y-4 ps-6">
          <li>Elevating local expertise</li>
          <li>Boosting the national GDP through strategic IT initiatives</li>
          <li>Diversifying the economy</li>
          <li>Unlocking the full potential of Saudi nationals</li>
        </ul>
        <p>Join us in shaping a prosperous, tech-savvy Saudi future.</p>
      </div>
      <BaseButton
        :class="[
          'font-section mt-[40px] h-[68px] max-w-[295px] text-[16px] font-[500] leading-[normal] lg:mt-[95px]',
          'lg:mt-[95px] lg:text-[20px] lg:font-[400] lg:leading-[21px] lg:tracking-[0.2px]'
        ]"
      >
        Let’s Talk
      </BaseButton>
    </div>
    <div class="app-container app-container--edit mt-[100px] lg:mt-[180px] 3xl:mt-[184px]">
      <h2
        :class="[
          'text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
          'lg:max-w-[70%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]'
        ]"
      >
        {{ aboutMission?.[`title_${locale}`] }}
      </h2>
      <p
        :class="[
          'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
          'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
        ]"
      >
        <span class="block">
          {{ aboutMission?.[`content_${locale}`] }}
        </span>
      </p>
    </div>
    <BaseModal
      v-model:open="modalOpen"
      containerClass="w-full !mx-0 !max-w-[500px] !bg-transparent"
      bodyClass="px-6"
      :canCloseByBackdrop="true"
      :canCloseByEsc="true"
    >
      <img
        :src="selectedCertificate.image"
        class="inline-block h-auto w-auto object-contain align-bottom"
        alt=""
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
const { t, locale } = useI18n()
const customFetch = useCustomFetch()
const { data: aboutData } = useAsyncData(() => customFetch(`/website/home/page/2/sections`), {
  transform: (res) => res.data || []
})
const { data: certificates } = useAsyncData(() => customFetch(`/website/home/certificates`), {
  transform: (res) => res.data || []
})
const aboutIntro = computed(() => aboutData.value?.find((d) => d?.code == 'about_intro'))
const visionStatement = computed(() => aboutData.value?.find((d) => d?.code == 'vision_statement'))
const certificatesSlider = computed(() =>
  aboutData.value?.find((d) => d?.code == 'certificates_slider')
)
const aboutGoals = computed(() => aboutData.value?.find((d) => d?.code == 'about_goals'))
const aboutMission = computed(() => aboutData.value?.find((d) => d?.code == 'about_mission'))
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
