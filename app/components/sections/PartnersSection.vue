<template>
  <section
    class="app-container flex items-start gap-5 bg-[#F0F0F0] pb-[230px] pt-[118px] font-zarid"
  >
    <h2
      class="w-[670px] pe-[5%] pt-[16px] text-[90px] font-light not-italic leading-[85.5px] tracking-[0.9px] text-[#18264A]"
    >
      ASTC is a trusted partner of:
    </h2>

    <article
      class="grid flex-1 grid-cols-[repeat(auto-fill,minmax(215px,1fr))] gap-x-[60px] gap-y-[40px]"
    >
      <figure
        v-for="({ grey, color }, i) in partnerPairs"
        :key="i"
        class="flex w-[215px] items-center p-0"
      >
        <img
          :src="grey"
          :alt="`logo ${i + 1}`"
          class="max-h-[75px]"
          @mouseover="$event.currentTarget.src = color"
          @mouseleave="$event.currentTarget.src = grey"
        />
      </figure>
    </article>
  </section>
</template>

<script setup>
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
