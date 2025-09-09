<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { ValidateOn, type Rule } from '~/modules/custom-form/types'
import { useFormField } from '~/modules/custom-form/composables/useFormField'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type LabelPlacement = 'above' | 'inside' | 'none'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    modelValue?: string | null
    rules?: (Rule | ((v: any) => true | string))[]
    validateOn?: ValidateOn
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
    rows?: number
    maxlength?: number | string
    minlength?: number | string
    realtimeMs?: number
  }>(),
  {
    size: 'md',
    modelValue: '',
    labelPlacement: 'above',
    rules: () => [],
    validateOn: ValidateOn.Submit,
    rows: 4
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | null): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'focus', ev: FocusEvent): void
}>()

const uid = Math.random().toString(36).slice(2)
const baseId = computed(() => props.id ?? `${props.name ?? 'ui-textarea'}-${uid}`)
const errorId = computed(() => `${baseId.value}-error`)
const descId = computed(() => `${baseId.value}-desc`)

const el = ref<HTMLTextAreaElement | null>(null)
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
      return {
        label: 'text-[20px] font-[400] leading-[150%]',
        labelFocus: 'peer-focus:text-base',
        area: 'px-3 py-2 text-sm'
      }
    case 'lg':
      return {
        label: 'text-[20px] font-[400] leading-[150%]',
        labelFocus: 'peer-focus:text-base',
        area: 'px-4 py-3 text-base'
      }
    case 'xl':
      return {
        label: 'text-[20px] font-[300] leading-[150%]',
        labelFocus:
          'peer-focus:text-base peer-focus:!px-[10px] peer-focus:!py-[0px] lg:peer-focus:!py-[1px] peer-[&:not(:placeholder-shown)]:text-base peer-[&:not(:placeholder-shown)]:!px-[10px] peer-[&:not(:placeholder-shown)]:!py-[0px] lg:peer-[&:not(:placeholder-shown)]:!py-[1px]',
        area: 'px-[19px] py-3 text-[20px] font-[300] leading-[150%]'
      }
    default:
      return {
        label: 'text-[20px] font-[400] leading-[150%]',
        labelFocus: 'peer-focus:text-base',
        area: 'px-3.5 py-2.5 text-sm'
      }
  }
})

const baseCls = [
  'block w-full rounded-[12px] bg-[#F1F4F7] border border-transparent text-[#000000]',
  'placeholder:text-[#999FA3]',
  'focus:outline-none focus:bg-white focus:border-[#9999994D]',
  '[&:not(:placeholder-shown)]:bg-white [&:not(:placeholder-shown)]:border-[#9999994D]',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
  'resize-y'
]

const areaCls = computed(() => [
  baseCls,
  sizeCls.value.area,
  computedError.value ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
])

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', v)
  onInputValidate()
}
function onBlur(e: FocusEvent) {
  onBlurValidate()
  emit('blur', e)
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
      <textarea
        ref="el"
        :id="baseId"
        class="base-textarea peer"
        :class="areaCls"
        :value="modelValue as any"
        :rows="rows"
        :placeholder="labelPlacement === 'inside' ? ' ' : placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :title="title"
        :required="required"
        :autocomplete="autocomplete"
        :aria-label="labelPlacement === 'none' ? ariaLabel : undefined"
        :aria-invalid="computedError ? 'true' : undefined"
        :aria-describedby="describedBy"
        @input="onInput"
        @blur="onBlur"
        @focus="$emit('focus', $event)"
      />

      <label
        v-if="label && labelPlacement === 'inside'"
        :for="baseId"
        :class="[
          sizeCls.label,
          sizeCls.labelFocus,
          'pointer-events-none absolute start-[16px] top-3 bg-transparent px-0 text-[#999FA3] transition-all duration-150',
          'peer-focus:-top-2 peer-focus:start-[6px] peer-focus:bg-white',
          'peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:start-[6px] peer-[&:not(:placeholder-shown)]:bg-white',
          'dark:peer-hover:bg-gray-900 dark:peer-focus:bg-gray-900 dark:peer-[&:not(:placeholder-shown)]:bg-gray-900'
        ]"
      >
        {{ label }}
      </label>
    </div>

    <p v-if="description" :id="descId" class="mt-1 text-xs text-gray-500">{{ description }}</p>
    <p v-if="computedError" :id="errorId" class="mt-1 text-xs text-red-600">{{ computedError }}</p>
  </div>
</template>
<style src="~/modules/custom-form/ui/field-colors.css"></style>
