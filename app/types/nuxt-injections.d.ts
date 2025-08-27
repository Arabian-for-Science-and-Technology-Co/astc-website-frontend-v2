import type { $Fetch } from 'ofetch'
// import { formatDate } from '~/plugins/dateFormat'
type FormatDateFn = (dateInput: Date | string | number | null | undefined, format?: string) => string

declare module '#app' {
  interface NuxtApp {
    $apiFetch: $Fetch
    $fd: FormatDateFn
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $apiFetch: $Fetch
    $fd: FormatDateFn
  }
}

export {}
