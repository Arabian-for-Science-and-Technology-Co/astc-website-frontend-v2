<template>
  <NuxtLayout :isWhiteLogo="true" :selectedTabClass="'bg-[#0D1667] text-white'" name="default">
    <div
      :class="[
        'app-container bg flex min-h-screen flex-col bg-[#F0F0F0] pb-[150px] pt-[--header-height] font-zarid text-black lg:pb-[230px] 3xl:pb-[247px]'
      ]"
    >
      about
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
  pageTransition: false,
  layoutTransition: false
})
</script>
<style>
.bg {
  background:
    linear-gradient(191deg, rgba(13, 22, 103, 0) 23.08%, #0d1667 70.2%),
    url('~/assets/Images/about/background.jpg') lightgray -2249px 0px / 218.841% 124.092% no-repeat;
}
</style>
