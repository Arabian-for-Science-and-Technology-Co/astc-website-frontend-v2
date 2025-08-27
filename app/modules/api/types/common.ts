export interface ApiResponse<T> {
  message: string
  status: number
  data: T
}

export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type Locale = 'en' | 'ar'
export type LocalizedKey<Base extends string> = `${Base}_${Locale}`
export type LocalizedPartial<B extends string> = {
  [K in `${B}_${Locale}`]?: string
}
