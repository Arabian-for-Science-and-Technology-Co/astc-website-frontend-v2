import { inject, onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import type { Rule } from '~/modules/custom-form/types'
import { FKEY } from '~/modules/custom-form/constants'  // <-- import the shared key

type LegacyRule = (value: unknown) => true | string
type AnyRule = Rule | LegacyRule

function adaptRule(rule: AnyRule): Rule {
  return (rule.length >= 2) ? (rule as Rule) : ((v) => (rule as LegacyRule)(v))
}

export function useFormField(
  name: string,
  model: Ref<any>,
  rules: AnyRule[] = [],
  opts?: {
    nativeEl?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>
    nativeMessages?: boolean
  }
) {
  const form = inject(FKEY, null)
  const error = ref<string | null>(null)

  if (!form) {
    // Optional: make the bug obvious during dev
    console.warn('[custom-form] No <CfAppForm> context for field:', name)
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
            return !el ? null : (el.checkValidity() ? null : el.validationMessage || 'Invalid value')
          }
        : undefined,
      el: () => opts?.nativeEl?.value ?? null
    })
  })

  onBeforeUnmount(() => form?.unregister(name))
  return { error, validateSelf: async () => ({ ok: true }) }
}
