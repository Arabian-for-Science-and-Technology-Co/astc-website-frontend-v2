<template>
  <form novalidate @submit="onSubmit"><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'

export type Rule = (
  value: unknown,
  ctx: { form: Record<string, unknown>; name: string }
) => true | string | Promise<true | string>

type Field = {
  name: string
  getValue: () => unknown
  setError: (msg?: string | null) => void
  rules: Rule[]
  nativeCheck?: () => string | null // optional: HTML validity
  el?: () => HTMLElement | null // optional: for focusing first invalid
}

const FKEY = Symbol('app-form')
const fields = new Map<string, Field>()

function register(field: Field) {
  fields.set(field.name, field)
}
function unregister(name: string) {
  fields.delete(name)
}

async function validate() {
  const formValues: Record<string, unknown> = {}
  fields.forEach((f, name) => (formValues[name] = f.getValue()))
  const errors: Record<string, string> = {}

  for (const [name, field] of fields) {
    // 1) native HTML validity first (if provided)
    const nativeMsg = field.nativeCheck?.() ?? null
    if (nativeMsg) {
      field.setError(nativeMsg)
      errors[name] = nativeMsg
      continue
    }

    // 2) custom rules
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

function onSubmit(e: Event) {
  e.preventDefault()
}

provide(FKEY, { register, unregister })
defineExpose({ validate, reset, focusFirstInvalid })
</script>
