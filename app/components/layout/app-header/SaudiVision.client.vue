<template>
  <article class="group flex items-center gap-[30px]">
    <img
      :src="settings.saudi_vision"
      :class="[
        'gray-overlay w-[50px]',
        'lg:w-[62px]',
        enableHover
          ? isWhiteLogo
            ? 'group-hover:brightness-0 group-hover:invert-[1]'
            : 'group-hover:filter-none'
          : isWhiteLogo
            ? 'brightness-0 invert-[1]'
            : 'filter-none'
      ]"
      @error="$event.target.src = saudi_vision"
    />
    <h3
      :class="[
        'hidden max-w-[210px] text-xl font-[300] not-italic leading-[100%] tracking-[0.2px] text-[#A9AEB8]',
        showLeftLogo ? '3xl:block' : 'lg:block',
        enableHover
          ? isWhiteLogo
            ? 'group-hover:text-white'
            : 'group-hover:text-black'
          : isWhiteLogo
            ? 'text-white'
            : 'text-black'
      ]"
    >
      {{ settings?.[`saudi_vision_title_${locale}`] }}
    </h3>
  </article>
</template>

<script setup>
import saudi_vision from '~/assets/Icons/vision_2030.svg?url'
const props = defineProps({
  showLeftLogo: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false },
  enableHover: { type: Boolean, default: true }
})

const { locale } = useI18n()
const { settings } = useWebsiteSettings()
</script>
