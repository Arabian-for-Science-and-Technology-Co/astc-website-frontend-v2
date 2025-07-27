<template>
  <section class="app-container h-[200px] bg-[#465AE6] pb-[40px] pt-[30px]">
    <div class="flex items-start h-full justify-start">
      <div class="text-[32px] uppercase not-italic tracking-[0.32px] text-white">
        <h4 class="mb-[2px] font-[700] leading-[120%]">June 3, 2025</h4>
        <p class="max-w-[580px] font-[400] leading-[90%]">
          Arabian for Sience and Technology. Empowering the Future with Cutting-Edge Technology...
        </p>
      </div>
      <img
        :src="newsVideo"
        class="me-[100px] h-[102px] w-[157px] self-end   rounded-[10px] object-cover"
      />
      <div
        class="flex flex-col items-end justify-between text-[52px] font-light not-italic leading-[95%] tracking-[0.52px] text-[#0ADF0A]"
      >
        <span>#</span>
        <span>#</span>
        <span>#</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import newsVideo from '~/assets/Images/news-video.png'
</script>
