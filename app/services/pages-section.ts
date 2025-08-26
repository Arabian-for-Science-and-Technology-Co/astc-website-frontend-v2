 export function fetchPageSection<T>(slug: string) {
  const { apiFetch } = useApi()
  return apiFetch<T>(`/website/home/page/sections/${slug}`)
}
