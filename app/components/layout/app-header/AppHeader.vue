<template>
  <section
    :class="[
      'app-container absolute z-40 flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
      'pt-[38px]'
    ]"
  >
    <!-- Left Logo Section -->
    <article v-if="showLeftLogo" class="-mt-[17px] hidden gap-[27px] lg:flex">
      <ASCLogoMainIcon
        :color="isWhiteLogo ? 'white' : null"
        class="mb-[7px] h-[68px] w-[130px] self-start"
      />
      <h3
        v-if="settings?.[`title_${locale}`]"
        :class="[
          'max-w-[129px] self-end text-xl font-[300] not-italic leading-[21px] tracking-[0.2px] text-[#18264A]',
          isWhiteLogo ? 'text-white' : 'text-[#18264A]'
        ]"
      >
        {{ settings?.[`title_${locale}`] }}
      </h3>
    </article>

    <ClientOnly>
      <!-- Center Vision Logo -->
      <SaudiVision
        :isWhiteLogo="isWhiteLogo"
        :showLeftLogo="showLeftLogo"
        class="mb-[10px] self-end"
      />

      <!-- Mobile Logo -->
      <div :class="['-ms-[50px] -mt-6 mb-0 block h-[55px] w-[106px]', 'lg:hidden']">
        <ASCLogoMainIcon class="h-full w-full" />
      </div>
    </ClientOnly>

    <!-- Mobile Menu Button -->
    <div class="self-start">
      <AppHeaderMenuMobile :tabs="tabs" />
    </div>

    <!-- Tabs Section -->
    <ClientOnly>
      <article class="hidden items-center gap-[40px] lg:flex">
        <LanguageSwitcher />
        <div :style="{ width: tabsRef?.containerWidth + 'px' }"></div>
        <Tabs ref="tabsRef" class="fixed end-[--container-ps]" v-model="selected" :tabs="tabs">
          <template #tab="{ tab, isSelected }">
            <h2
              @mouseenter="
                enableHover && tab.id == 'products-and-solutions' ? (isHovering = true) : ''
              "
              :class="[!isSelected && 'hover:text-[#1778FF]']"
            >
              {{ tab.label }}
            </h2>
            <span
              v-if="tab.isNew"
              class="absolute end-[7px] top-[7px] h-2 w-2 rounded-full bg-[#0ADF0A]"
            >
            </span>
            <teleport to="body">
              <FlaotingProductsBar
                v-if="isHovering && tab.id == 'products-and-solutions'"
                @mouseover="
                  enableHover && tab.id == 'products-and-solutions' ? (isHovering = true) : ''
                "
                @mouseleave="
                  enableHover && tab.id == 'products-and-solutions' ? (isHovering = false) : ''
                "
                :tabs="tabs"
              />
            </teleport>
          </template>
        </Tabs>
      </article>
    </ClientOnly>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  showLeftLogo: { type: Boolean, default: true },
  enableHover: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false }
})

import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
const { locale } = useI18n()

const { pages } = usePages()
const { settings } = useWebsiteSettings()

const tabs = computed(() =>
  pages.value
    .filter((page) => page.slug != 'home')
    .map((page) => ({
      id: page.slug,
      label: page?.[`title_${locale.value}`],
      value: page.slug,
      isNew: page.slug == 'news'
    }))
)
const selected = ref(null)
const isHovering = ref(false)
const tabsRef = ref(null)

watch(isHovering, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
