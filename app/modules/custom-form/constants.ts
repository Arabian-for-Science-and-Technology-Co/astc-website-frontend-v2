// modules/custom-form/constants.ts
import type { InjectionKey } from 'vue'

export interface FormCtx {
  register: (f: any) => void
  unregister: (name: string) => void
}

export const FKEY: InjectionKey<FormCtx> = Symbol('app-form')
