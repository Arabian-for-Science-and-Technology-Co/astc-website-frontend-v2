<template>
  <section
    :class="[
      'app-container bg-[#F0F0F0] pb-[70px] pt-[70px] font-zarid',
      'lg:pb-[174px] lg:pt-[80px]',
      '2xl:pb-[103px] 2xl:pt-[104px]'
    ]"
  >
    <h2
      :class="[
        'mb-[47.43px] w-full text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#18264A]',
        'lg:mb-[64px] lg:max-w-[90%] lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
        '2xl:mb-[87px] 2xl:max-w-[350px]'
      ]"
    >
      Among our customers:
    </h2>
    <article
      :class="[
        'mb-[80.57px] flex w-full flex-wrap justify-start gap-[10px]',
        'lg:mb-[67.52px] lg:w-[85%] lg:gap-[16.2px]',
        '2xl:mb-[109px] 2xl:w-[70%] 2xl:gap-6'
      ]"
    >
      <figure
        v-for="(imgSrc, i) in data"
        :class="[
          'aspect-square h-[107px] w-[106px] p-2',
          'lg:h-[145.2px] lg:w-[145.2px] lg:p-2',
          '2xl:h-[215px] 2xl:w-[215px] 2xl:p-5'
        ]"
      >
        <img
          :key="i"
          :src="imgSrc"
          class="h-full w-full object-contain transition-transform hover:-translate-y-[10px]"
          alt=""
        />
      </figure>
    </article>
    <button
      class="w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-xl font-[400] not-italic leading-[21px] tracking-[0.2px] text-black transition-colors hover:bg-white/70"
    >
      Discover All Cases
    </button>
  </section>
</template>

<script setup>
import client_1 from '~/assets/Images/main/clients/client_1.png'
import client_2 from '~/assets/Images/main/clients/client_2.png'
import client_3 from '~/assets/Images/main/clients/client_3.png'
import client_4 from '~/assets/Images/main/clients/client_4.png'
import client_5 from '~/assets/Images/main/clients/client_5.png'
import client_6 from '~/assets/Images/main/clients/client_6.png'
import client_7 from '~/assets/Images/main/clients/client_7.png'
import client_9 from '~/assets/Images/main/clients/client_9.png'
const data = [
  //
  client_2,
  client_3,
  client_4,
  client_5,
  client_1,

  client_6,
  client_7,
  client_9
]
</script>
<style scoped></style>
