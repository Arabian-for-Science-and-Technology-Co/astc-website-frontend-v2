import { inject, onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import type { Rule } from '~/modules/custom-form/types'
import { FKEY } from '~/modules/custom-form/constants'

type LegacyRule = (value: unknown) => true | string
type AnyRule = Rule | LegacyRule
const adaptRule = (r: AnyRule): Rule => (r.length >= 2 ? (r as Rule) : (v) => (r as LegacyRule)(v))

export function useFormField(
  name: string,
  model: Ref<any>,
  rules: AnyRule[] = [],
  opts?: {
    nativeEl?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>
    nativeMessages?: boolean
    validateOn?: 'submit' | 'blur' | 'input' | 'touched' // default 'touched'
  }
) {
  const form = inject(FKEY, null)
  const error = ref<string | null>(null)
  const touched = ref(false)

  async function runValidation(): Promise<string | null> {
    // 1) native validity
    if (opts?.nativeMessages) {
      const el = opts?.nativeEl?.value
      if (el && !el.checkValidity()) return el.validationMessage || 'Invalid value'
    }
    // 2) custom rules, first failing wins
    const formValues = form?.snapshot?.() ?? {}
    for (const rule of rules.map(adaptRule)) {
      const res = await rule(model.value, { form: formValues, name })
      if (res !== true) return res
    }
    return null
  }

  async function validateSelf(trigger: 'input' | 'blur' | 'submit' = 'submit') {
    if (trigger === 'blur') touched.value = true

    // skip showing errors until touched when validateOn='touched'
    if (trigger === 'input' && opts?.validateOn === 'touched' && !touched.value) {
      return { ok: true }
    }

    const msg = await runValidation()
    error.value = msg
    return { ok: !msg }
  }

  onMounted(() => {
    form?.register({
      name,
      rules: rules.map(adaptRule),
      getValue: () => model.value,
      setError: (msg?: string | null) => (error.value = msg ?? null),
      nativeCheck: opts?.nativeMessages
        ? () => {
            const el = opts?.nativeEl?.value
            return el ? (el.checkValidity() ? null : el.validationMessage || 'Invalid value') : null
          }
        : undefined,
      el: () => opts?.nativeEl?.value ?? null
    })
  })
  onBeforeUnmount(() => form?.unregister(name))

  return { error, touched, validateSelf }
}
