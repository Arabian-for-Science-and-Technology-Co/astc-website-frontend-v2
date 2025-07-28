<template>
  <section class="app-container bg-[#F0F0F0] pb-[103px] pt-[104px] font-zarid">
    <h2
      class="max-w-[350px] text-[90px] font-[200] not-italic leading-[85.5px] tracking-[0.9px] text-[#18264A]"
    >
      Among our customers:
    </h2>
    <article class="mt-[87px] flex w-[70%] flex-wrap justify-start gap-6">
      <figure v-for="(imgSrc, i) in data" class="h-[215px] w-[215px] p-5">
        <img
          :key="i"
          :src="imgSrc"
          class="h-full w-full transition-transform hover:-translate-y-[10px]"
          alt=""
        />
      </figure>
    </article>
    <button
      class="mt-[109px] w-full max-w-[275px] rounded-3xl bg-white py-[23px] text-center text-xl font-[400] not-italic leading-[21px] tracking-[0.2px] text-black"
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
