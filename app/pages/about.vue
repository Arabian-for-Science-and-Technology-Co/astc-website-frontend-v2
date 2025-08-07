<template>
  <NuxtLayout :isWhiteLogo="true" :selectedTabClass="'bg-[#0D1667] text-white'" name="default">
    <div
      :class="[
        'bg flex min-h-screen flex-col bg-[#0D1667] pb-[209px] pt-[--header-height] font-zarid text-white lg:pb-[300px] 3xl:pb-[280px]'
      ]"
    >
      <img
        :src="goldenImg"
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
          Arabian for Sience and Technology
        </h2>
        <p
          :class="[
            'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
            'lg:mt-[57px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
          ]"
        >
          <span class="block">
            Established in 2007, Arabian for Science and Technology Co. (ASTC) stands as one of the
            leading Master Systems Integrators of Saudi Arabia.
          </span>
          <span class="block">
            We pride ourselves on building lasting partnerships, providing cost-effective solutions,
            and maintaining a highly skilled team committed to reaching success in any projects.
          </span>
          <span class="block">
            From 2023, we prioritize delivering fully local solutions everywhere it is possible and
            feasible - starting from our in-house development and ending up with international
            partnerships and Merge & Acquisitions of prospective products, that allow us to build
            local expertise and transfer the best world's practices and know-how.
          </span>
        </p>
        <h2
          :class="[
            'mt-[91px] text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
            'lg:mt-[180px] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
            'lg:mt-[171px]'
          ]"
        >
          Our Vision —
          <br />
          Innovate Local, Impact Global
        </h2>
      </div>
      <div class="mt-[100px] lg:mt-[180px]">
        <h2
          :class="[
            'app-container app-container--edit max-w-[264px] text-[30px] font-[600] leading-[110%] tracking-[0.3px]',
            'lg:max-w-full'
          ]"
        >
          Some of our licenses and certificates
        </h2>
        <ScrollWithDragWrapper
          class="mt-[49px] pe-[--container-pe] ps-[--container-ps] lg:mt-[53px] lg:pe-0 lg:ps-0"
        >
          <div
            class="grid auto-cols-max grid-flow-col grid-rows-2 items-end gap-[30px] lg:grid-rows-1"
          >
            <img
              v-for="certificate in certificates"
              :key="certificate.src"
              :src="certificate.src"
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
          Our Goals
        </h2>
        <div
          :class="[
            'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
            'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
          ]"
        >
          <p>
            ASTC is dedicated to fostering the technological independence of Saudi Arabia. We are
            committed to achieving this by:
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
          Our Mission
        </h2>
        <p
          :class="[
            'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
            'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]'
          ]"
        >
          <span class="block">
            We empower Saudi talents to create innovative technologies that accelerate the Kingdom's
            digital economy, contributing to national prosperity and setting new benchmarks on the
            world stage.
          </span>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import goldenImg from '~/assets/Images/about/golden_sign.png'
const certificatesModules = import.meta.glob('~/assets/Images/about/certificates/*.png', {
  eager: true
})
const certificates = Object.entries(certificatesModules).map(([_, module], index) => ({
  src: module.default
}))
definePageMeta({
  layout: false,
  pageTransition: false,
  layoutTransition: false
})
const { $customFetch } = useNuxtApp()
// const { data: categoryItems } = await useAsyncData(
//   () => $customFetch(`/website/home/categories/${route.params.id}/items`),
//   {
//     transform: (res) => res.data || []
//   }
// )
</script>
<style scoped>
.bg {
  background:
    linear-gradient(191deg, rgba(13, 22, 103, 0) 23.08%, #0d1667 70.2%),
    url('~/assets/Images/about/background.jpg');
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
