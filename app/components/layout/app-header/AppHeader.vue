<template>
  <section
    :class="[
      'app-container absolute z-40 flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
      'pt-[--header-pt]'
    ]"
  >
    <!-- Left Logo Section -->
    <article v-if="showLeftLogo" class="-mt-[17px] hidden gap-[27px] lg:flex">
      <BaseImg
        densities="x1 x2"
        format="webp"
        @click="navigateTo('/')"
        :src="isWhiteLogo ? settings.logo_light : settings.logo_dark"
        :class="['mb-[7px] h-[68px] w-[130px] self-start hover:cursor-pointer']"
        :fallback="ASC_Logo_Main"
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
        <BaseImg
          densities="x1 x2"
          format="webp"
          :src="settings.logo_dark"
          class="h-full w-full"
          :fallback="ASC_Logo_Main"
        />
      </div>
    </ClientOnly>

    <div class="mobileMenu-placeholder">
      <MobileMenu
        class="gird fixed end-[--container-ps] top-[--header-pt] z-[100] lg:hidden"
        :tabs="tabs"
      />
    </div>

    <ClientOnly>
      <article class="hidden items-center gap-[40px] lg:flex">
        <LanguageSwitcher
          :class="isCategoriesOrProductsandsolutionsPage && enableHover && '!bg-white'"
        />
        <div class="desktopMenu-placeholder" :style="{ width: desktopMenuRef?.width + 'px' }">
          <DesktopMenu
            ref="desktopMenuRef"
            class="fixed end-[--container-pe] top-[--header-pt] z-[60] hidden lg:flex"
            :tabs="tabs"
            :enableHover="enableHover"
          />
        </div>
      </article>
    </ClientOnly>
  </section>
</template>

<script setup>
const ASC_Logo_Main = '/Icons/ASC_Logo_Main.svg'

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
const isCategoriesOrProductsandsolutionsPage = computed(() =>
  ['/products-and-solutions', '/categories-details'].some((p) => route.fullPath.startsWith(p))
)

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

const desktopMenuRef = ref(null)
</script>
