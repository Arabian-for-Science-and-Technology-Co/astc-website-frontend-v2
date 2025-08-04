<template>
  <section
    :class="[
      'app-container absolute z-40 flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
      'pt-[38px]'
    ]"
  >
    <!-- Left Logo Section -->
    <article v-if="showLeftLogo" class="-mt-[17px] hidden gap-[27px] lg:flex">
      <img
        @click="navigateTo('/')"
        :src="isWhiteLogo ? settings.logo_light : settings.logo_dark"
        :class="['mb-[7px] h-[68px] w-[130px] self-start hover:cursor-pointer']"
        @error="$event.target.src = ASC_Logo_Main"
      />
      <h3
        v-if="settings?.[`title_${locale}`]"
        :class="[
          'max-w-[155px] self-end text-xl font-[400] not-italic leading-[21px] tracking-[0.2px] text-[#18264A]',
          isWhiteLogo ? 'text-white' : 'text-[#18264A]'
        ]"
      >
        {{ settings?.[`title_${locale}`] }}
      </h3>
    </article>

    <!-- Center Vision Logo -->
    <SaudiVision
      :isWhiteLogo="isWhiteLogo"
      :showLeftLogo="showLeftLogo"
      class="mb-[10px] self-end"
    />

    <ClientOnly>
      <!-- Mobile Logo -->
      <div :class="['-ms-[50px] -mt-6 mb-0 block h-[55px] w-[106px]', 'lg:hidden']">
        <img
          :src="settings.logo_dark"
          class="h-full w-full"
          @error="$event.target.src = ASC_Logo_Main"
        />
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
        <div class="tabs-placeholder" :style="{ width: tabsRef?.containerWidth + 'px' }"></div>
      </article>
    </ClientOnly>
    <teleport to="body">
      <Tabs
        :returnObject="false"
        ref="tabsRef"
        :class="[
          'fixed end-[--container-pe] top-[38px] z-[60] hidden lg:flex',
          !enableHover && '!z-[-50] opacity-0'
        ]"
        :modelValue="route.path"
        @update:modelValue="(val) => navigateTo(val)"
        :tabs="tabs"
      >
        <template #tab="{ tab, isSelected }">
          <h2
            @mouseenter="
              enableHover && tab.id == 'products-and-solutions'
                ? (isHovering = true)
                : (isHovering = false)
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
        </template>
      </Tabs>
      <FlaotingProductsBar
        class="fixed start-0 top-0 z-[50]"
        v-if="isHovering"
        @mouseover="enableHover ? (isHovering = true) : ''"
        @mouseleave="enableHover ? (isHovering = false) : ''"
        :tabs="tabs"
      />
    </teleport>
  </section>
</template>

<script setup>
import ASC_Logo_Main from '~/assets/Icons/ASC_Logo_Main.svg?url'

const props = defineProps({
  showLeftLogo: { type: Boolean, default: true },
  enableHover: { type: Boolean, default: true },
  isWhiteLogo: { type: Boolean, default: false }
})

import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
const { locale } = useI18n()

const { pages } = usePages()
const { settings } = useWebsiteSettings()
const route = useRoute()

const tabs = computed(() =>
  pages.value
    .filter((page) => page.slug != 'home')
    .map((page) => ({
      id: page.slug,
      label: page?.[`title_${locale.value}`],
      value: `/${page.slug}`,
      isNew: page.slug == 'news' && route.path != '/news'
    }))
)

const isHovering = ref(false)
const tabsRef = ref(null)

watch(isHovering, (val) => {
  console.log('isHovering', isHovering.value)

  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(
  route,
  () => {
    isHovering.value = false
  },
  { deep: true }
)
</script>
