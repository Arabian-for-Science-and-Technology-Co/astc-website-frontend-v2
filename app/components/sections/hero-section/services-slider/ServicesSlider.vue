<template>
  <section class="flex w-full justify-start gap-[40px] overflow-x-auto overflow-y-auto">
    <figure
      v-for="(service, index) in services"
      :key="index"
      class="group relative h-[580px] w-[360px] overflow-hidden rounded-[48px]"
    >
      <img
        :src="service.img"
        class="object-cover transition-transform group-hover:scale-110"
        alt=""
      />
      <figcaption
        class="absolute top-0 z-10 flex h-full w-full flex-col justify-between px-[40px] pb-[40px] pt-[45px]"
      >
        <h3 class="text-[52px] font-[300] not-italic leading-[95%] tracking-[0.52px] text-white">
          {{ service.label }}
        </h3>
        <button
          class="w-full rounded-3xl bg-[#FFFFFF1A] pt-[23px] pb-[24px] text-center text-[20px] font-normal not-italic leading-[105%] tracking-[0.2px] text-white backdrop-blur-[17px]"
        >
          Explore
        </button>
      </figcaption>
    </figure>
  </section>
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
