<template>
  <div class="relative grid min-h-[100svh] place-items-center px-4 py-8">
    <video
      autoplay
      muted
      loop
      playsinline
      disablePictureInPicture
      disableRemotePlayback
      id="myVideo"
      class="absolute left-1/2 top-0 -z-10 max-h-screen w-[150%] -translate-x-1/2 xl:w-full"
    >
      <source src="~/assets/animation/main_head.mp4" type="video/mp4" />
    </video>
    <div
      class="w-full max-w-[720px] rounded-2xl bg-white/40 p-7 text-center shadow-[0_1px_2px_rgba(16,24,40,0.06),0_10px_40px_rgba(16,24,40,0.08)] backdrop-blur-lg"
    >
      <!-- <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="title"
        class="mx-auto mb-4 block h-[clamp(160px,40vmin,300px)] w-[clamp(160px,40vmin,300px)] object-contain"
        loading="lazy"
        decoding="async"
      /> -->

      <h1
        class="mb-[10px] text-[clamp(22px,3.4vmin,32px)] font-extrabold leading-[1.2] tracking-[-0.02em]"
      >
        <span class="me-2 font-bold opacity-60">{{ statusCode }}</span>
        {{ title }}
      </h1>

      <p class="mx-auto mb-5 max-w-[52ch] text-slate-600">
        {{ description }}
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink
          class="inline-flex cursor-pointer appearance-none items-center justify-center rounded-[10px] border border-black/10 bg-transparent px-[14px] py-[10px] font-semibold text-gray-900 transition-all duration-200 ease-out hover:bg-black/5 active:translate-y-px"
          to="/"
        >
          Go home
        </NuxtLink>

        <button
          class="inline-flex cursor-pointer appearance-none items-center justify-center rounded-[10px] border-0 bg-transparent px-[6px] py-2 font-semibold text-blue-600 transition-all duration-200 ease-out hover:underline active:translate-y-px"
          @click="handleError"
        >
          Clear errors
        </button>
      </div>

      <details v-if="processEnvDev" class="mt-[18px] text-left">
        <summary>Debug details</summary>
        <pre class="whitespace-pre-wrap break-words rounded-lg bg-slate-900/5 p-3 text-xs">{{
          prettyError
        }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'
import { clearError } from '#app'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError & { statusCode?: number } }>()

const statusCode = computed(() => Number(props.error?.statusCode ?? 500))
const variants = {
  '404': {
    title: 'Page not found',
    description: `We couldn’t find the page you’re looking for.`,
    image: '/errors/404.svg'
  },
  '401': {
    title: 'You need to sign in',
    description: `This page requires authentication.`,
    image: '/errors/401.svg'
  },
  '403': {
    title: 'Access denied',
    description: `You don’t have permission to view this page.`,
    image: '/errors/403.svg'
  },
  '4xx': {
    title: 'Something went wrong',
    description: `There was a problem with your request.`,
    image: '/errors/4xx.svg'
  },
  '5xx': {
    title: 'Server error',
    description: `It’s not you—it’s us. Please try again in a moment.`,
    image: '/errors/500.svg'
  },
  default: {
    title: 'Unexpected error',
    description: `An unexpected error occurred.`,
    image: '/errors/generic.svg'
  }
} as const

const variant = computed(() => {
  const code = statusCode.value
  if (variants[String(code) as keyof typeof variants]) {
    return variants[String(code) as keyof typeof variants]
  }
  if (code >= 500) return variants['5xx']
  if (code >= 400) return variants['4xx']
  return variants.default
})

const title = computed(() => variant.value.title)
const description = computed(() => variant.value.description)
const imageSrc = computed(() => variant.value.image)

const handleError = () => clearError({ redirect: '/' })

useHead(() => ({
  title: `${statusCode.value} – ${title.value}`
}))

const processEnvDev = import.meta.dev
const prettyError = computed(() => JSON.stringify(props.error ?? {}, null, 2))
onMounted(() => {
  console.error(props.error)
})
</script>
