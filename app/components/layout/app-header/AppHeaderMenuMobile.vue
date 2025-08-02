<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="gird fixed end-[--container-ps] m-0 aspect-square h-[42px] place-items-center rounded-xl bg-[#0000000D] p-0 backdrop-blur-[6px] lg:hidden"
    >
      <MenuMobileIcon />
    </button>
    <teleport to="body">
      <section
        v-if="isOpen"
        class="fixed pb-[66.8px] start-0 top-0 z-[100] flex h-[100vh] w-full flex-col overflow-y-auto bg-[#0D1667] text-white"
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
                  showLeftLogo ? '2xl:block' : 'lg:block'
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
          <button @click="isOpen = !isOpen" class="self-start">
            <CloseIcon />
          </button>
        </section>
        <div
          :class="[
            'app-container grid-rows-col grid-col-1 mt-[81px] grid w-fit gap-x-[0px] gap-y-[28px]'
          ]"
        >
          <h3
            v-for="tab in tabs"
            :class="['text-[52px] font-[200] not-italic leading-[49.4px] tracking-[0.52px]']"
          >
            {{ tab.label }}
          </h3>
        </div>
        <ProductsSection class="text-white !pt-[98x] pb-[114px]" />
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
