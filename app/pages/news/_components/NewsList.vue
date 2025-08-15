<template>
  <div class="mt-[85px] flex flex-col gap-[59px] lg:mt-[143px] lg:gap-[73px]">
    <NuxtLink
      v-for="(item, index) in listData"
      :to="`/news/${item.slug}`"
      class="group hover:cursor-pointer"
    >
      <h4
        :class="[
          'transition-colors group-hover:text-[#0ADF0A]',
          'text-[30px] font-[600] leading-[110%] tracking-[0.3px]'
        ]"
      >
        {{ $fd(item.updated_at, 'll') }}
      </h4>
      <p
        :class="[
          'mt-[8px] text-[30px] font-[400] leading-[110%] transition-colors group-hover:text-[#0ADF0A] lg:tracking-[0.3px]',
          'lg:mt-[6px] lg:text-[52px] lg:font-[200] lg:leading-[95%] lg:tracking-[0.52px]'
        ]"
      >
        {{ item?.[`title_${locale}`] }}
      </p>
      <BaseImg
        densities="x1 x2"
        format="webp"
        v-if="item.image"
        :src="item.image"
        class="mt-[24px] aspect-[180/103] w-[279.623px] self-end rounded-[10px] object-cover lg:mt-[42px] lg:aspect-[7/4] lg:w-[280px]"
        :alt="`video`"
      />
      <div
        :class="[
          'mt-[56px] flex w-full max-w-[308px] items-center justify-start overflow-x-hidden text-[20px] font-[300] leading-[110%] tracking-[19.8px] text-[#0ADF0A] group-last-of-type:hidden',
          'lg:mt-[88px] lg:max-w-full lg:text-[30px]'
        ]"
      >
        #####################
      </div>
    </NuxtLink>
    <BaseButton
      :isStyled="false"
      :disabled="isLoadingMore"
      v-if="currentPage != totalPages && listData?.length"
      :isLoading="isLoadingMore"
      @click="$emit('update:currentPage', currentPage + 1)"
      :loadarProps="{
        color: '#0ADF0A',
        size: 26
      }"
      :class="[
        'relative mx-auto mt-[28px] self-center text-[22px] font-[500] leading-[120%] tracking-[0.22px] text-[#0ADF0A] transition-all hover:opacity-80',
        'font-durke lg:mt-[43px] lg:text-[28px] lg:tracking-[0.28px]'
      ]"
    >
      <SlashSvg />
      <span class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        {{ $t('more_news') }}
      </span>
    </BaseButton>
  </div>
</template>

<script setup>
const props = defineProps({
  listData: { type: [Array, null], default: [] },
  isLoadingMore: { type: Boolean },
  totalPages: { type: Number },
  currentPage: { type: Number }
})
const { locale } = useI18n()
</script>
<style></style>
