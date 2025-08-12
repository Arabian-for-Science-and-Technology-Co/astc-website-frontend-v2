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
            'mx-0 w-full transform overflow-y-auto transition-all',
            formMode
              ? 'h-[80vh] max-w-full rounded-3xl rounded-b-none bg-white lg:h-auto lg:max-w-lg lg:rounded-b-3xl'
              : 'max-w-lg bg-transparent',
            containerClass
          ]"
          @submit.prevent="handleSubmit"
          @keydown.esc="handleEsc"
        >
          <!-- Header -->
          <div
            v-if="$slots.header || title"
            :class="[
              'flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700',
              headerClass
            ]"
          >
            <slot name="header">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title }}</h3>
            </slot>
          </div>

          <!-- Body -->
          <div :class="[bodyClass]">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            :class="['border-t border-gray-200 px-6 py-4 dark:border-gray-700', footerClass]"
          >
            <slot name="footer" />
          </div>
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

function handleSubmit() {
  props.onConfirm?.()
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
