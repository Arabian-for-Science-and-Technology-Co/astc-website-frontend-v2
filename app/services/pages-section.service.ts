import type { ApiResponse } from '~/modules/api/types'

export async function getPageSection<T>(slug: string): Promise<T> {
  const { apiFetch } = useApi()
  const res = await apiFetch<ApiResponse<T>>(`/website/home/page/sections/${slug}`)
  return res.data
}

export async function getPageSectionRaw<T>(slug: string): Promise<ApiResponse<T>> {
  const { apiFetch } = useApi()
  return apiFetch<ApiResponse<T>>(`/website/home/page/sections/${slug}`)
}
