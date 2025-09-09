<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { ValidateOn, type Rule } from '~/modules/custom-form/types'
import { useFormField } from '~/modules/custom-form/composables/useFormField'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type LabelPlacement = 'above' | 'inside' | 'none'
type Option = { label: string; value: string | number } | string | number

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    modelValue?: string | number | null
    options: Option[]
    rules?: (Rule | ((v: any) => true | string))[]
    validateOn?: ValidateOn
    placeholder?: string
    size?: Size
    disabled?: boolean
    required?: boolean
    error?: string | null
    description?: string | null
    label?: string
    labelPlacement?: LabelPlacement
    ariaLabel?: string
    valueType?: 'string' | 'number'
    autocomplete?: string
    realtimeMs?: number
  }>(),
  {
    modelValue: '',
    rules: () => [],
    validateOn: ValidateOn.Submit,
    size: 'md',
    labelPlacement: 'above',
    valueType: 'string'
  }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number | null): void }>()

const uid = Math.random().toString(36).slice(2)
const baseId = computed(() => props.id ?? `${props.name ?? 'ui-select'}-${uid}`)
const errorId = computed(() => `${baseId.value}-error`)
const descId = computed(() => `${baseId.value}-desc`)

const el = ref<HTMLSelectElement | null>(null)
const {
  error: ruleError,
  onInputValidate,
  onBlurValidate
} = useFormField(baseId.value, toRef(props, 'modelValue') as any, props.rules, {
  nativeEl: el as any,
  nativeMessages: true,
  validateOn: props.validateOn,
  realtimeMs: props.realtimeMs
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
      return { label: 'text-[20px] font-[400] leading-[150%]', select: 'h-9 px-3 text-sm' }
    case 'lg':
      return { label: 'text-[20px] font-[400] leading-[150%]', select: 'h-12 px-4 text-base' }
    case 'xl':
      return {
        label: 'text-[20px] font-[300] leading-[150%]',
        select: 'h-[50px] px-[19px] text-[20px] font-[300] leading-[150%]'
      }
    default:
      return { label: 'text-[20px] font-[400] leading-[150%]', select: 'h-10 px-3.5 text-sm' }
  }
})

const baseCls = [
  'block w-full rounded-[12px] bg-[#F1F4F7] border border-transparent text-[#000000]',
  'focus:outline-none focus:bg-white focus:border-[#9999994D]',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'dark:bg-gray-900 dark:text-gray-100',
  'appearance-none'
]
const selectCls = computed(() => [
  baseCls,
  sizeCls.value.select,
  computedError.value ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
])

// Normalize options
const normOptions = computed<{ label: string; value: string | number }[]>(() =>
  props.options.map((o) =>
    typeof o === 'object' && o !== null && 'label' in o && 'value' in o
      ? (o as any)
      : { label: String(o), value: o as any }
  )
)

const isFocused = ref(false)
const hasValue = computed(
  () => props.modelValue !== null && props.modelValue !== '' && props.modelValue !== undefined
)

function onChange(e: Event) {
  const target = e.target as HTMLSelectElement
  const raw = target.value
  const v =
    props.valueType === 'number' ? (raw === '' ? null : Number(raw)) : raw === '' ? null : raw
  emit('update:modelValue', v as any)
  onInputValidate()
}
</script>

<template>
  <div class="w-full font-zarid">
    <label
      v-if="label && labelPlacement === 'above'"
      :for="baseId"
      :class="[sizeCls.label, 'mb-1 block text-black']"
    >
      {{ label }} <span v-if="required" aria-hidden="true" class="text-red-600">*</span>
    </label>

    <div class="relative">
      <!-- Select -->
      <select
        ref="el"
        :id="baseId"
        class="base-select peer"
        :class="selectCls"
        :value="(modelValue as any) ?? ''"
        :disabled="disabled"
        :required="required"
        :aria-label="labelPlacement === 'none' ? ariaLabel : undefined"
        :aria-invalid="computedError ? 'true' : undefined"
        :aria-describedby="describedBy"
        :autocomplete="autocomplete"
        @change="onChange"
        @focus="isFocused = true"
        @blur="
          () => {
            isFocused = false
            onBlurValidate()
          }
        "
      >
        <!-- Placeholder option for inside label UX -->
        <option value="" disabled hidden>
          {{ placeholder ?? (labelPlacement === 'inside' ? label : '') }}
        </option>
        <option v-for="opt in normOptions" :key="String(opt.value)" :value="String(opt.value)">
          {{ opt.label }}
        </option>
      </select>

      <!-- Floating inside label (manual, since :placeholder-shown doesn't apply to <select>) -->
      <label
        v-if="label && labelPlacement === 'inside'"
        :for="baseId"
        :class="[
          'pointer-events-none absolute left-4 text-[#999FA3] transition-all duration-150',
          // center when empty & not focused
          !isFocused && !hasValue ? 'top-1/2 -translate-y-1/2' : '',
          // float when focused or has value
          isFocused || hasValue ? '-top-3 left-2 bg-white px-1 text-xs' : ''
        ]"
      >
        {{ label }}
      </label>

      <!-- (optional) trailing chevron via slot or CSS background if you like -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="trailing" />
      </div>
    </div>

    <p v-if="description" :id="descId" class="mt-1 text-xs text-gray-500">{{ description }}</p>
    <p v-if="computedError" :id="errorId" class="mt-1 text-xs text-red-600">{{ computedError }}</p>
  </div>
</template>

<style src="~/modules/custom-form/ui/field-colors.css" scoped>
/* custom dropdown arrow if desired:
.base-select {
  background-image: url('data:image/svg+xml;utf8,<svg .../>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}
*/
</style>
