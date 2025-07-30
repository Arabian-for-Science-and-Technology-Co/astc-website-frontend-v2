<template>
  <SliderCarousel trackClass="app-container flex justify-start lg:gap-[40px] gap-[28.67px]   ">
    <figure
      v-for="(service, index) in services"
      :key="index"
      :class="[
        'group relative h-[415.7px] w-[258px] shrink-0 overflow-hidden rounded-[34px]',
        'lg:h-[580px] lg:w-[360px] lg:rounded-[48px]'
      ]"
    >
      <img
        :src="service.img"
        class="h-full w-full object-cover transition-transform group-hover:scale-110"
        alt=""
      />
      <figcaption
        :class="[
          'absolute top-0 z-10 flex h-full w-full flex-col justify-between px-[28.67px] pb-[28.67px] pt-[32px]',
          'lg:px-[40px] lg:pb-[40px] lg:pt-[45px]'
        ]"
      >
        <h3
          :class="['text-[52px] font-[300] not-italic leading-[95%] tracking-[0.52px] text-white']"
        >
          {{ service.label }}
        </h3>
        <button
          :class="[
            'w-full rounded-[17.201px] bg-[#FFFFFF1A] pb-[15.25px] pt-[12.48px] text-center text-[18px] font-normal not-italic leading-[105%] tracking-[0.2px] text-white backdrop-blur-[17px]',
            'lg:rounded-3xl lg:pb-[24px] lg:pt-[23px] lg:text-[20px]'
          ]"
        >
          Explore
        </button>
      </figcaption>
    </figure>
  </SliderCarousel>
</template>

<script setup>
import productImage1 from '~/assets/Images/main/products_cards/product_1.png'
import productImage2 from '~/assets/Images/main/products_cards/product_2.png'
import productImage3 from '~/assets/Images/main/products_cards/product_3.png'
import productImage4 from '~/assets/Images/main/products_cards/product_4.png'

const services = [
  { label: 'Products', img: productImage1 },
  { label: 'Solutions', img: productImage2 },
  { label: 'Managed Services', img: productImage3 },
  { label: 'Services', img: productImage4 }
]
</script>
<style></style>
