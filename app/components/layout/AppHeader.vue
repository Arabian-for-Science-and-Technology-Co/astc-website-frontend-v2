<template>
  <section
    :class="[
      'app-container absolute z-40 flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
      'pt-[38px]'
    ]"
  >
    <article class="flex items-center gap-[30px]">
      <VisionLogoIcon :class="['w-[50px]', 'lg:w-auto']" />
      <h3
        class="hidden text-xl font-[300] not-italic leading-[100%] tracking-[0.2px] text-[#A9AEB8] lg:block"
      >
        Every Saudi must get involved
        <br />
        for a better future
      </h3>
    </article>
    <ClientOnly>
      <div :class="['-ms-[50px] -mt-6 mb-0 block h-[55px] w-[106px]', 'lg:hidden']">
        <ASCLogoMainIcon class="h-full w-full" />
      </div>
    </ClientOnly>
    <div class="self-start">
      <button
        class="gird fixed end-[--container-ps] m-0 aspect-square h-[42px] place-items-center rounded-xl bg-[#0000000D] p-0 backdrop-blur-[6px] lg:hidden"
      >
        <MenuMobileIcon />
      </button>
    </div>

    <ClientOnly>
      <article class="hidden items-center gap-[40px] lg:flex">
        <LanguageSwitcher />
        <div :style="{ width: tabsRef?.containerWidth + 'px' }"></div>
        <Tabs ref="tabsRef" class="fixed end-[--container-ps]" v-model="selected" :tabs="tabs">
          <template #tab="{ tab, isSelected }">
            <h2 :class="[!isSelected && 'hover:text-[#1778FF]']">
              {{ tab.label }}
            </h2>
            <span
              v-if="tab.isNew"
              class="absolute end-[7px] top-[7px] h-2 w-2 rounded-full bg-[#0ADF0A]"
            >
            </span>
          </template>
        </Tabs>
      </article>
    </ClientOnly>
  </section>
</template>

<script setup>
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
const tabs = [
  { id: 'products_solutions', label: 'Products & Solutions', value: 'Products & Solutions' },
  { id: 'news', label: 'News', value: 'News', isNew: true },
  { id: 'about', label: 'About', value: 'About' },
  { id: 'contact', label: 'Contact', value: 'Contact' }
]
const selected = ref(null)

const tabsRef = ref(null)
</script>
