<template>
  <article
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
    :style="{ color: color }"
    class="flex items-center gap-[30px]"
  >
    <VisionLogoIcon :color="color" :class="['w-[50px]', 'lg:w-auto']" />
    <h3
      :class="[
        'hidden text-xl font-[300] not-italic leading-[100%] tracking-[0.2px]',
        showLeftLogo ? '3xl:block' : 'lg:block'
      ]"
    >
      Every Saudi must get involved
      <br />
      for a better future
    </h3>
  </article>
</template>

<script setup>
const props = defineProps({
  showLeftLogo: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false }
})
const isHovering = ref(false)
const color = computed(() => {
  if (props.isWhiteLogo) {
    return isHovering.value ? 'white' : '#A9AEB8'
  } else {
    return isHovering.value ? 'black' : '#A9AEB8'
  }
})
</script>
