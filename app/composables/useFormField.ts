import { inject, onMounted, onBeforeUnmount, ref, toRef, type Ref } from 'vue'
import type { Rule } from '~/components/ui/form/AppForm.vue'

type LegacyRule = (value: unknown) => true | string
type AnyRule = Rule | LegacyRule

export const FKEY = Symbol('app-form') as InjectionKey<{
  register: (f: any) => void
  unregister: (name: string) => void
}>

function adaptRule(rule: AnyRule): Rule {
  // if rule expects 2 args, assume it already follows (value, ctx)
  if (rule.length >= 2) return rule as Rule
  // otherwise wrap legacy 1-arg rule
  const r1 = rule as LegacyRule
  return (value) => r1(value)
}

export function useFormField(
  name: string,
  model: Ref<any>,
  rules: AnyRule[] = [],
  opts?: {
    nativeEl?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>
    nativeMessages?: boolean // read validity + validationMessage
  }
) {
  const form = inject(FKEY, null)
  const error = ref<string | null>(null)

  onMounted(() => {
    form?.register({
      name,
      rules: rules.map(adaptRule),
      getValue: () => model.value,
      setError: (msg?: string | null) => (error.value = msg ?? null),
      nativeCheck: opts?.nativeMessages
        ? () => {
            const el = opts?.nativeEl?.value
            if (!el) return null
            return el.checkValidity() ? null : el.validationMessage || 'Invalid value'
          }
        : undefined,
      el: () => opts?.nativeEl?.value ?? null
    })
  })
  onBeforeUnmount(() => form?.unregister(name))

  // on-demand validate helper (e.g., on blur)
  async function validateSelf(trigger: 'input' | 'blur' | 'submit' = 'submit') {
    // you can choose to skip rules until blur, etc. keep simple here:
    const msg = null // let AppForm run the canonical validation at submit
    if (trigger !== 'submit') error.value = msg
    return { ok: !msg }
  }

  return { error, validateSelf }
}
