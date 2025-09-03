<template>
  <form novalidate @submit.prevent="$emit('submit', $event)"><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { Rule } from '~/modules/custom-form/types'
import { FKEY } from '~/modules/custom-form/constants'

type Field = {
  name: string
  getValue: () => unknown
  setError: (msg?: string | null) => void
  rules: Rule[]
  nativeCheck?: () => string | null
  el?: () => HTMLElement | null
}

const fields = new Map<string, Field>()

function register(field: Field) {
  fields.set(field.name, field)
}
function unregister(name: Field['name']) {
  fields.delete(name)
}
function snapshot() {
  const formValues: Record<string, unknown> = {}
  fields.forEach((f, n) => (formValues[n] = f.getValue()))
  return formValues
}

async function validate() {
  const formValues = snapshot()
  const errors: Record<string, string> = {}

  for (const [name, field] of fields) {
    const nativeMsg = field.nativeCheck?.() ?? null
    if (nativeMsg) {
      field.setError(nativeMsg)
      errors[name] = nativeMsg
      continue
    }

    let message: string | null = null
    for (const rule of field.rules || []) {
      const res = await rule(formValues[name], { form: formValues, name })
      if (res !== true) {
        message = res as string
        break
      }
    }
    field.setError(message)
    if (message) errors[name] = message
  }
  return { valid: Object.keys(errors).length === 0, errors }
}

function reset() {
  fields.forEach((f) => f.setError(null))
}
function focusFirstInvalid() {
  for (const [, f] of fields) {
    const el = f.el?.()
    if (el && (el as HTMLInputElement).focus) {
      ;(el as HTMLInputElement).focus()
      break
    }
  }
}

provide(FKEY, { register, unregister, snapshot })
defineExpose({ validate, reset, focusFirstInvalid })
</script>
