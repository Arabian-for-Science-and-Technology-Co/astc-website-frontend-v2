import type { InjectionKey } from 'vue'

export interface FormCtx {
  register: (f: any) => void
  unregister: (name: string) => void
  snapshot: () => Record<string, unknown> // <-- NEW
}

export const FKEY: InjectionKey<FormCtx> = Symbol('app-form')
