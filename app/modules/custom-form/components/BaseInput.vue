<script setup lang="ts">
import { computed, ref, toRef } from 'vue' // ⬅️ added ref, toRef
import type { InputHTMLAttributes } from 'vue'
import type { Rule } from '~/modules/custom-form/types'
import { useFormField } from '~/modules/custom-form/composables/useFormField' // ⬅️ new

type Size = 'sm' | 'md' | 'lg' | 'xl'
type LabelPlacement = 'above' | 'inside' | 'none'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    modelValue?: string | number | null
    type?: string
    minlength?: number | string
    maxlength?: number | string
    step?: number | string
    pattern?: string
    rules?: (Rule | ((v: any) => true | string))[]
    inputmode?: InputHTMLAttributes['inputmode']
    title?: string
    placeholder?: string
    size?: Size
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    autocomplete?: string
    error?: string | null
    description?: string | null
    label?: string
    labelPlacement?: LabelPlacement
    ariaLabel?: string
  }>(),
  {
    type: 'text',
    size: 'md',
    modelValue: '',
    labelPlacement: 'above',
    rules: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'focus', ev: FocusEvent): void
}>()
const uid = Math.random().toString(36).slice(2) // once, stable for component lifetime
const baseId = computed(() => props.id ?? `${props.name ?? 'ui-input'}-${uid}`)
const errorId = computed(() => `${baseId.value}-error`)
const descId = computed(() => `${baseId.value}-desc`)

const el = ref<HTMLInputElement | null>(null)
const { error: ruleError } = useFormField(baseId.value, toRef(props, 'modelValue'), props.rules, {
  nativeEl: el,
  nativeMessages: true
})

const computedError = computed<string | null>(() => props.error ?? ruleError.value ?? null)

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.description) ids.push(descId.value)
  if (computedError.value) ids.push(errorId.value)
  return ids.join(' ') || undefined
})

const sizeCls = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        label: 'text-[20px] font-[400] leading-[150%]  ',
        labelFocus: 'peer-focus:text-base',
        input: 'h-9 px-3 text-sm'
      }
    case 'lg':
      return {
        label: 'text-[20px] font-[400] leading-[150%]  ',
        labelFocus: 'peer-focus:text-base',
        input: 'h-12 px-4 text-base'
      }
    case 'xl':
      return {
        label: 'text-[20px] font-[300] leading-[150%]  ',
        labelFocus:
          'peer-focus:text-base peer-focus:!px-[10px] peer-focus:!py-[0px] lg:peer-focus:!py-[1px] peer-[&:not(:placeholder-shown)]:text-base peer-[&:not(:placeholder-shown)]:!px-[10px] peer-[&:not(:placeholder-shown)]:!py-[0px] lg:peer-[&:not(:placeholder-shown)]:!py-[1px]',
        input: 'h-[50px] px-[19px]  text-[20px] font-[300] leading-[150%]'
      }
    default:
      return {
        label: 'text-[20px] font-[400] leading-[150%]  ',
        labelFocus: 'peer-focus:text-base',
        input: 'h-10 px-3.5 text-sm'
      }
  }
})

const inputBase = [
  'block w-full rounded-[12px] bg-[#F1F4F7] border border-transparent text-[#000000] ',
  'placeholder:text-[#999FA3]',
  'focus:outline-none focus:bg-white focus:border-[#9999994D]  ',
  '[&:not(:placeholder-shown)]:bg-white [&:not(:placeholder-shown)]:border-[#9999994D]  ',
  'disabled:cursor-not-allowed disabled:opacity-60 ',
  'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500'
]

const inputCls = computed(() => [
  inputBase,
  sizeCls.value.input,
  computedError.value ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300' // ← use merged error
])

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full font-zarid">
    <!-- ABOVE LABEL -->
    <label
      v-if="label && labelPlacement === 'above'"
      :for="baseId"
      :class="[sizeCls.label, 'mb-1 block text-black']"
    >
      {{ label }} <span v-if="required" aria-hidden="true" class="text-red-600">*</span>
    </label>

    <!-- INPUT WRAPPER -->
    <div class="relative" :class="{}">
      <!-- LEADING SLOT -->
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <slot name="leading" />
      </div>

      <!-- INPUT (peer for floating label) -->
      <input
        ref="el"
        :id="baseId"
        class="base-input peer"
        :class="['', inputCls, $slots.leading ? 'pl-9' : '', $slots.trailing ? 'pr-9' : '']"
        :type="type"
        :value="modelValue as any"
        :placeholder="labelPlacement === 'inside' ? ' ' : placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :minlength="minlength"
        :maxlength="maxlength"
        :step="step"
        :pattern="pattern"
        :inputmode="inputmode"
        :title="title"
        :required="required"
        :autocomplete="autocomplete"
        :aria-label="labelPlacement === 'none' ? ariaLabel : undefined"
        :aria-invalid="computedError ? 'true' : undefined"
        :aria-describedby="describedBy"
        @input="onInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <!-- TRAILING SLOT -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="trailing" />
      </div>

      <!-- INSIDE / FLOATING LABEL -->
      <label
        v-if="label && labelPlacement === 'inside'"
        :for="baseId"
        :class="[
          sizeCls.label,
          sizeCls.labelFocus,
          'pointer-events-none absolute start-[16px] top-1/2 -translate-y-1/2 bg-transparent px-0 text-[#999FA3] transition-all duration-150',
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0',
          'peer-focus:-top-3 peer-focus:start-[6px] peer-focus:translate-y-0 peer-focus:bg-white',
          'peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:start-[6px] peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:bg-white',
          'dark:peer-hover:bg-gray-900 dark:peer-focus:bg-gray-900 dark:peer-[&:not(:placeholder-shown)]:bg-gray-900',
          $slots.leading ? 'left-9' : ''
        ]"
      >
        {{ label }}
      </label>
    </div>

    <!-- DESCRIPTION -->
    <p v-if="description" :id="descId" class="mt-1 text-xs text-gray-500">
      {{ description }}
    </p>

    <!-- ERROR -->
    <p v-if="computedError" :id="errorId" class="mt-1 text-xs text-red-600">
      {{ computedError }}
    </p>
  </div>
</template>

<style scoped>
/* Hide number input arrows in Chrome, Edge, Safari (WebKit) */
.base-input[type='number']::-webkit-outer-spin-button,
.base-input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide number input arrows in Firefox */
.base-input[type='number'] {
  -moz-appearance: textfield;
}

/* Optional: ensure iOS Safari shows no spinner */
.base-input[type='number'] {
  -webkit-appearance: none;
}
</style>
