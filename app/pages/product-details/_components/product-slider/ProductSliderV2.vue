<template>
  <div class="hospitality-slider-holder relative w-full" @click="handleContainerClick">
    <!-- Prev -->
    <button
      type="button"
      aria-label="Previous image"
      @click.stop="viewSwiper?.slidePrev()"
      class="non-close-zone absolute start-0 top-1/2 z-50 -translate-y-1/2 rounded bg-black/40 px-3 py-2 text-white"
      :disabled="!canNavigate"
    >
      &lt;
    </button>

    <!-- Next -->
    <button
      type="button"
      aria-label="Next image"
      @click.stop="viewSwiper?.slideNext()"
      class="non-close-zone absolute end-0 top-1/2 z-50 -translate-y-1/2 rounded bg-black/40 px-3 py-2 text-white"
      :disabled="!canNavigate"
    >
      &gt;
    </button>

    <div id="SpacesImagesSection__slider" class="non-close-zone sm:mx-[50px]">
      <ClientOnly>
        <swiper
          @swiper="onSwiper"
          @slideChange="updateActiveThumb"
          :space-between="30"
          :navigation="false"
          :loop="images.length > 1"
          class="view-swiper !mx-auto max-h-[635px] w-full max-w-[1124px]"
          :slides-per-view="1"
          :initial-slide="showSlider.currentImageIndex"
          :key="`view-${showSlider.currentImageIndex}-${images.length}`"
        >
          <swiper-slide v-for="(img, index) in images" :key="img?.id ?? index">
            <img
              :src="img?.image_url"
              :alt="img?.alt || `Image ${index + 1}`"
              width="1124"
              height="635"
              loading="lazy"
              class="h-full w-full cursor-pointer rounded-[8px] object-cover"
            />
          </swiper-slide>
        </swiper>

        <HrListSlider ref="hrListSlider" :items="images" :spaceBetween="10" class="mt-6">
          <template #item="{ item, index, isActive }">
            <img
              @click.stop="goToSlide(index)"
              :src="item?.image_url"
              :alt="item?.alt || `Thumb ${index + 1}`"
              width="60"
              height="60"
              loading="lazy"
              :class="[
                'h-[60px] w-[60px] rounded-full border-[2px] border-solid border-transparent object-cover',
                isActive && '!border-blue-400'
              ]"
            />
          </template>
        </HrListSlider>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, computed } from 'vue'
import { Swiper as SwiperVue, SwiperSlide as SwiperSlideVue } from 'swiper/vue'
import 'swiper/css'
import HrListSlider from './HrListSlider.vue'

const Swiper = SwiperVue
const SwiperSlide = SwiperSlideVue

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})

const showSlider = reactive({
  state: false,
  currentImageIndex: 0
})

const viewSwiper = ref(null)
const hrListSlider = ref(null)

const canNavigate = computed(() => props.images.length > 1)

function onSwiper(swiper) {
  viewSwiper.value = swiper
}

function goToSlide(index) {
  const s = viewSwiper.value
  if (!s) return
  s.params.loop ? s.slideToLoop(index) : s.slideTo(index)
}

function updateActiveThumb(swiper) {
  hrListSlider.value?.scrollToActive?.(swiper.realIndex)
}

function handelOpenSlider(index = 0) {
  showSlider.state = true
  showSlider.currentImageIndex = Math.min(Math.max(index, 0), props.images.length - 1)
  nextTick(() => {
    hrListSlider.value?.scrollToActive?.(showSlider.currentImageIndex)
  })
}

function handelCloseSlider() {
  showSlider.state = false
  showSlider.currentImageIndex = 0
}

function handleContainerClick(event) {
  const target = event.target
  if (!target.closest('.non-close-zone')) {
    handelCloseSlider()
  }
}

// optional: open immediately like your original
onMounted(() => {
  handelOpenSlider()
})

// optional: keyboard navigation
function onKey(e) {
  if (!showSlider.state) return
  if (e.key === 'ArrowRight') viewSwiper.value?.slideNext()
  if (e.key === 'ArrowLeft') viewSwiper.value?.slidePrev()
}
if (process.client) {
  window.addEventListener('keydown', onKey)
}
</script>
