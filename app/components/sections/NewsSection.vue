<template>
  <section
    class="scrollWrapper app-container h-[200px] overflow-auto bg-[#465AE6] pb-[40px] pt-[30px] font-zarid"
  >
    <div class="flex h-full items-start justify-start gap-[52px]">
      <div
        class="group flex h-full flex-shrink-0 items-start justify-start"
        v-for="(item, index) in data"
      >
        <div class="text-[32px] not-italic tracking-[0.32px] text-white">
          <h4 class="mb-[2px] font-[700] uppercase leading-[38.4px]">{{ item.title }}</h4>
          <h4
            class="w-[580px] text-[32px] font-[300] not-italic leading-[30.4px] tracking-[0.32px] text-white"
          >
            {{ item.desc }}
          </h4>
        </div>
        <img
          v-if="item.video"
          :src="item.video"
          class="h-[102px] w-[157px] self-end rounded-[10px] object-cover"
        />
        <div
          class="ms-[100px] flex flex-col items-end justify-between text-[52px] font-light not-italic leading-[95%] tracking-[0.52px] text-[#0ADF0A] group-last-of-type:hidden"
        >
          <span>#</span>
          <span>#</span>
          <span>#</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import newsVideo from '~/assets/Images/news-video.png'
const data = [
  {
    title: 'June 3, 2025',
    desc: 'Arabian for Sience and Technology. \n Empowering the Future with Cutting-Edge \n Technology...',
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
  color: #fff;

  /* Web/astc_web_news-text_desktop */
  font-family: '29LT Zarid Sans AL';
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 95%; /* 30.4px */
  letter-spacing: 0.32px;
}
</style>
