<template>
  <section class="h-[200px] bg-[#465AE6] pb-[36px] pt-[30px] font-zarid">
    <div
      class="scrollWrapper app-container flex h-full items-start justify-start gap-[95px] overflow-auto"
    >
      <div
        class="group relative flex h-full flex-shrink-0 items-start justify-start pe-[100px] last-of-type:pe-0"
        v-for="(item, index) in data"
      >
        <div class="not-italic text-white hover:text-[#0ADF0A]">
          <h4
            :class="[
              'main-title mb-[14px] text-[16px] font-[500] uppercase leading-[19.2px] tracking-[0.16px]',
              'lg:mb-[2px] lg:text-[32px] lg:font-[700] lg:leading-[38.4px] lg:tracking-[0.32px]'
            ]"
          >
            {{ item.title }}
          </h4>
          <h4
            :class="[
              'text-truncate-multi w-[220px] text-[20px] font-[200] leading-[21px] tracking-[0.32px]',
              'lg:w-[580px] lg:pe-[10%] lg:text-[32px] lg:font-[300] lg:leading-[30.4px]'
            ]"
          >
            {{ item.desc }}
          </h4>
        </div>
        <img
          v-if="item.video"
          :src="item.video"
          class="mb-[17px] h-[87px] w-[133.912px] self-end rounded-[10px] object-cover lg:mb-0 lg:h-[102px] lg:w-[157px]"
        />
        <div
          class="absolute bottom-0 end-0 flex flex-col items-start justify-start text-[40px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#0ADF0A] group-last-of-type:hidden lg:text-[52px]"
        >
          <span>#</span>
          <span>#</span>
          <span>#</span>
        </div>
      </div>
      <button
        class="my-auto whitespace-nowrap text-center align-middle font-durke text-[20px] font-medium uppercase not-italic leading-[120%] tracking-[0.32px] text-[#0ADF0A] hover:text-white lg:text-[32px]"
      >
        all news /
      </button>
    </div>
  </section>
</template>

<script setup>
import newsVideo from '~/assets/Images/news-video.png'
const data = [
  {
    title: 'June 3, 2025',
    desc: `Arabian for Sience and Technology.  Empowering the Future with Cutting-Edge   TechnologyTechnology Technology Technology Technology Technology Technology Technology `,
    video: newsVideo
  },
  {
    title: 'June 3, 2025',
    desc: 'Arabian for Sience and Technology.',
    video: null
  },
  {
    title: 'June 3, 2025',
    desc: 'Arabian for Sience and Technology. Empowering the Future with Cutting-Edge Technology...',
    video: null
  }
]
</script>
<style>
.scrollWrapper {
  overflow-x: auto;
  overflow-y: hidden;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
.scrollWrapper::-webkit-scrollbar {
  display: none;
}
.main-title {
  font-family: 'Druk Wide', sans-serif;
}

@media (min-width: 1024px) {
  .main-title {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif;
  }
}
</style>
