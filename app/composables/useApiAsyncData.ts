import type { AsyncDataOptions } from 'nuxt/app'
import { applyPolicyOrThrow } from '~/utils/api-error-policy'

export async function useApiAsyncData<T>(
  key: string | (() => string),
  handler: () => Promise<T>,
  options?: AsyncDataOptions<T>
) {
  const res = await useAsyncData<T>(key, handler, options)

  // If the internal fetch failed, apply the single global policy
  if (res.error.value) {
    applyPolicyOrThrow(res.error.value)
  }
  return res
}
