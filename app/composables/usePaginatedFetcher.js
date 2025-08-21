/**
 * @param {import('../types/paginatedFetcher').PaginatedFetcherOptions} options
 * @returns {import('../types/paginatedFetcher').PaginatedFetcherApi}
 */
const _toValue = (v) => {
  // If Vue 3.3's toValue exists, use it
  const tv = (typeof globalThis !== 'undefined' && globalThis.Vue?.toValue) || undefined
  if (typeof tv === 'function') return tv(v)
  // else: unwrap refs and call getters
  return typeof v === 'function' ? v() : unref(v)
}

export function usePaginatedFetcher(options) {
  const {
    service,
    defaultPerPage = 10,
    defaultIsLoading = false,
    filterParams = {}, // MaybeRefOrGetter<Record<string, any>>
    watch: watchSources = [],
    rowsKey = 'data',
    paginationKey = 'meta',
    immediate = true,
    isLoadMorePagination = false,
    delay = 500
  } = options

  const isLoading = ref(defaultIsLoading)
  const isLoadingMore = ref(false)
  const rows = ref([])
  const selectedRows = ref([])
  const perPage = ref(defaultPerPage)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const search = ref('')

  // Always read the latest value of filterParams, whatever its shape (ref/getter/plain)
  const filterParamsValue = computed(() => _toValue(filterParams) || {})

  const buildParams = () => {
    const fp = filterParamsValue.value || {}
    const picked = Object.entries(fp).reduce((acc, [key, value]) => {
      // keep 0 and false; drop only null/undefined and empty string
      if (value !== '' && value !== null && value !== undefined) acc[key] = value
      return acc
    }, {})
    return {
      page: currentPage.value,
      per_page: perPage.value,
      ...(search.value ? { keyword: search.value } : {}),
      ...picked
    }
  }

  const fetchData = async (queryParams) => {
    isLoading.value = isLoadingMore.value ? false : true
    try {
      const result = await service(queryParams || buildParams())
      const list = result?.[rowsKey] ?? []
      rows.value = isLoadingMore.value ? rows.value.concat(list) : list
      totalPages.value = result?.[paginationKey]?.last_page || 1
      selectedRows.value = []
    } catch (error) {
      try {
        useHandleErrorMsg?.(error)
      } catch (_) {}
      console.error('Fetch error:', error)
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }
  const loadMore = () => {
    isLoadingMore.value = true
    currentPage.value++
    fetchData()
  }
  // page changes (supports "load more")
  watchDebounced(currentPage, () => !isLoadMorePagination && fetchData(), { debounce: delay })

  // search / perPage / filters — snapshot object to avoid deep: true
  watchDebounced(
    [search, perPage, () => ({ ...filterParamsValue.value })],
    () => {
      currentPage.value = 1
      fetchData()
    },
    { debounce: 100 }
  )

  // extra watch sources from caller
  if (Array.isArray(watchSources) && watchSources.length) {
    watchDebounced(
      watchSources,
      () => {
        currentPage.value = 1
        fetchData()
      },
      { debounce: delay }
    )
  }

  if (immediate) fetchData()

  return {
    isLoading,
    isLoadingMore,
    rows,
    selectedRows,
    perPage,
    currentPage,
    totalPages,
    search,
    fetchData,
    loadMore,
    refresh: fetchData
  }
}
