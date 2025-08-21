<template>
  <div class="relative w-full" @click="handleContainerClick">
    <img
      :src="currentImg?.image_url"
      :alt="img?.alt || `Image ${index + 1}`"
      width="1124"
      height="635"
      loading="lazy"
      class=" max-h-[90svh]  xl:aspect-[118/75] aspect-[323/205] w-full cursor-pointer rounded-[8px] object-cover"
    />
    <ScrollWithDragWrapper class="mt-[21px] !cursor-pointer">
      <div class="flex gap-[10px]">
        <img
          v-for="(item, index) in images"
          :key="`list-${index}`"
          @click.stop="goToSlide(item)"
          :src="item?.image_url"
          :alt="item?.alt || `Thumb ${index + 1}`"
          width="60"
          height="60"
          loading="lazy"
          :class="[
            'h-[60px] w-[60px] shrink-0 rounded-full border-[2px] border-solid border-transparent object-cover',
            item.id == currentImg.id && '!border-blue-400'
          ]"
        />
      </div>
    </ScrollWithDragWrapper>
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})
const currentImg = ref(props.images[0])
function goToSlide(item) {
  currentImg.value = item
}
</script>
