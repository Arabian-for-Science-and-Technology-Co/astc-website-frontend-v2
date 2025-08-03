<template>
  <section
    :class="[
      'app-container flex flex-col items-start gap-[46px] bg-[#F0F0F0] pb-[64px] pt-[70px] font-zarid',
      'lg:gap-[52px] lg:pb-[93px] lg:pt-[80px]',
      '3xl:flex-row 3xl:gap-5 3xl:pb-[230px] 3xl:pt-[118px]'
    ]"
  >
    <h2
      :class="[
        'w-full pe-0 pt-0 text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px] text-[#18264A]',
        'lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]',
        '3xl:w-[670px] 3xl:pe-[5%] 3xl:pt-[16px]'
      ]"
    >
      ASTC is a trusted partner of:
    </h2>

    <article
      :class="[
        'grid w-full grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-x-[60px] gap-y-[40px] py-7',
        'lg:w-[90%] lg:flex-1 lg:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] lg:gap-x-[30px] lg:gap-y-[50px] lg:py-7',
        '3xl:w-full 3xl:flex-1 3xl:grid-cols-[repeat(auto-fill,minmax(215px,1fr))] 3xl:gap-x-[60px] 3xl:gap-y-[40px] 3xl:py-0'
      ]"
    >
      <figure
        v-for="({ grey, color }, i) in partnerPairs"
        :key="i"
        :class="[
          'flex h-[50px] w-[120px] items-center justify-start',
          'lg:h-[50px] lg:w-[190px]',
          '3xl:h-[75px] 3xl:w-[215px]'
        ]"
      >
        <img
          :src="grey"
          :alt="`logo ${i + 1}`"
          class="h-full object-contain transition-opacity"
          @mouseover="$event.currentTarget.src = color"
          @mouseleave="$event.currentTarget.src = grey"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </article>
  </section>
</template>

<script setup>
const props = defineProps({
  sectionData: { type: Object, defaults: {} }
})
onMounted(() => {
  console.log('props.sectionData', props.sectionData)
})
// 1. Grab everything matching partner_*.png, eager‑loaded at build time
const modules = import.meta.glob('~/assets/Images/main/partners/partner_*.png', { eager: true })

// 2. Group into { grey, color } pairs keyed by "partner_X"
const pairs = Object.entries(modules).reduce((acc, [fullPath, module]) => {
  const filename = fullPath.split('/').pop() // e.g. "partner_1_grey.png"
  const isGrey = filename.includes('_grey')
  // strip off either "_grey.png" or ".png" to get base name
  const base = isGrey ? filename.replace('_grey.png', '') : filename.replace('.png', '')

  if (!acc[base]) acc[base] = { grey: null, color: null }
  if (isGrey) acc[base].grey = module.default
  else acc[base].color = module.default

  return acc
}, /** @type Record<string,{grey:string|null,color:string|null}> */ ({}))

// 3. Turn into a sorted array for predictable ordering:
const partnerPairs = Object.entries(pairs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, pair]) => pair)
</script>

<style scoped>
/* Your existing styles… */
</style>
