<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="gird fixed end-[--container-ps] m-0 h-[42px] w-[42px] place-items-center rounded-xl bg-[#0000000D] p-0 backdrop-blur-[6px] lg:hidden"
    >
      <MenuMobileIcon class="h-[8px] w-[18px]" />
    </button>
    <teleport to="body">
      <section
        v-if="isOpen"
        class="fixed start-0 top-0 z-[100] flex h-[100vh] w-full flex-col overflow-y-auto bg-[#0D1667] pb-[66.8px] text-white"
      >
        <section
          :class="[
            'app-container z-[100] flex h-fit w-full items-center justify-between bg-transparent transition-colors duration-300',
            'pt-[38px]'
          ]"
        >
          <ClientOnly>
            <!-- Center Vision Logo -->
            <article class="mb-[10px] flex items-center gap-[30px] self-end">
              <VisionLogoIcon color="white" :class="['w-[50px]', 'lg:w-auto']" />
              <h3
                :class="[
                  'hidden text-xl font-[300] not-italic leading-[100%] tracking-[0.2px] text-[#A9AEB8]',
                  showLeftLogo ? '3xl:block' : 'lg:block'
                ]"
              >
                Every Saudi must get involved
                <br />
                for a better future
              </h3>
            </article>

            <!-- Mobile Logo -->
            <div :class="['-mt-6 mb-0 block h-[55px] w-[106px]', 'lg:hidden']">
              <ASCLogoMainIcon color="white" class="h-full w-full" />
            </div>
          </ClientOnly>

          <!-- Mobile Menu Button -->
          <button
            @click="isOpen = !isOpen"
            class="gird m-0 h-[42px] w-[42px] place-items-center rounded-xl bg-[#0000000D] p-0 backdrop-blur-[6px] lg:hidden"
          >
            <CloseIcon class="h-[42px] w-[42px]" />
          </button>
        </section>
        <div
          :class="['app-container mt-[81px] inline-flex w-fit flex-col items-stretch gap-y-[28px]']"
        >
          <h3
            v-for="tab in tabs"
            :class="[
              'relative w-fit text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px]'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="tab.isNew"
              class="absolute end-[-8px] top-[0px] h-2 w-2 rounded-full bg-[#0ADF0A]"
            >
            </span>
          </h3>
        </div>
        <ProductsSection class="!pb-[114px] !pt-[98px] text-white" />
        <AppFooterSection1 themeColor="white" class="text-white" />
      </section>
    </teleport>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true }
})
const isOpen = ref(false)
watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
<style scoped></style>
