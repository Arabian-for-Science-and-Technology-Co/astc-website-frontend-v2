<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        :class="[
          'fixed inset-0 z-[1000] flex w-full justify-center bg-black/70',
          formMode ? 'items-end lg:items-center' : 'items-center'
        ]"
        @click.self="handleBackdropClose"
        tabindex="0"
      >
        <!-- Close button OUTSIDE the container -->
        <button
          v-if="showOutsideCloseBtn"
          class="absolute right-[50px] top-[50px] z-50 text-white transition hover:text-red-300 3xl:text-[28px]"
          @click="handleCancel"
        >
          ✕
        </button>

        <!-- Modal container -->
        <component
          :is="formMode ? 'form' : 'div'"
          :class="[
            'styled-scrollbar mx-0 w-full transform transition-all',
            formMode
              ? 'h-[80vh] max-w-full rounded-3xl rounded-b-none bg-white lg:h-auto lg:max-w-lg lg:rounded-b-3xl'
              : 'max-w-lg bg-transparent',
            containerClass
          ]"
          @submit.prevent="handleSubmit"
          @keydown.esc="handleEsc"
        >
          <header
            v-if="$slots.header || title"
            :class="[
              'flex items-center justify-between border-gray-200 pt-[29px] dark:border-gray-700',
              headerClass
            ]"
          >
            <button
              type="button"
              @click="handleCancel"
              class="absolute end-[19px] top-[19px] hover:opacity-55 lg:end-5 lg:top-5"
            >
              <CloseIcon1 :size="19" />
            </button>
            <slot name="header">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title }}</h3>
            </slot>
          </header>

          <main :class="[bodyClass]">
            <slot />
          </main>

          <footer v-if="$slots.footer" :class="[footerClass]">
            <slot name="footer" />
          </footer>
        </component>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: Boolean,
  title: String,
  formMode: Boolean,
  onConfirm: Function,
  onCancel: Function,
  canCloseByBackdrop: { type: Boolean, default: true },
  canCloseByEsc: { type: Boolean, default: true },
  showOutsideCloseBtn: { type: Boolean, default: true },
  containerClass: String,
  headerClass: String,
  bodyClass: String,
  footerClass: String
})

const emit = defineEmits(['update:open'])

const open = ref(props.open)

watch(
  () => props.open,
  (val) => {
    open.value = val
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

function close() {
  emit('update:open', false)
}

async function handleSubmit(e) {
  // if form is invalid -> show native validation UI and do nothing
  if (props.formMode && !e.target.checkValidity()) {
    // show default browser validation UI
    if (typeof e.target.reportValidity === 'function') {
      e.target.reportValidity()
    }
    return
  }

  // valid -> prevent normal navigation and handle in Vue
  await props.onConfirm?.()
  close()
}

function handleCancel() {
  props.onCancel?.()
  close()
}

function handleBackdropClose() {
  if (props.canCloseByBackdrop) {
    handleCancel()
  }
}

function handleEsc(e) {
  if (e.key === 'Escape' && props.canCloseByEsc) {
    handleCancel()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>

<style></style>
