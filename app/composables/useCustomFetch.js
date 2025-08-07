export const useCustomFetch = () => {
  const { $customFetch } = useNuxtApp()
  return $customFetch
}