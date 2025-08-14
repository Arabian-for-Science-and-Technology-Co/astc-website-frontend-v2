export function usePaginatedFetcher(options) {
  const {
    service,
    defaultPerPage = 10,
    defaultIsLoading = false,
    filterParams, //MaybeRefOrGetter
    watch: watchSources = [], // Add the new watch option
    rowsKey = 'data',
    paginationKey = 'meta',
    isLoadMorePagination = false,
    immediate = true,
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
  //   const reactiveFilterParams = reactive(filterParams)
  const reactiveFilterParams = toRef(filterParams)
  const buildParams = () => ({
    page: currentPage.value,
    per_page: perPage.value,
    ...(search.value && { keyword: search.value }),
    ...Object.entries(reactiveFilterParams.value).reduce((acc, [key, value]) => {
      if (value) acc[key] = value
      return acc
    }, {})
  })

  const fetchData = async (queryParams) => {
    // if (isLoading.value) return;
    isLoading.value = isLoadingMore.value ? false : true
    try {
      const result = await service(queryParams || buildParams())
      rows.value = isLoadingMore.value
        ? [...rows.value, ...(result?.[rowsKey] || [])]
        : result?.[rowsKey]
      totalPages.value = result?.[paginationKey]?.last_page || 1
      selectedRows.value = []
    } catch (error) {
      useHandleErrorMsg(error)
      console.error('Fetch error:', error)
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }

  watchDebounced(
    currentPage,
    (newVal, oldVal) => {
      if (isLoadMorePagination && newVal > oldVal) {
        isLoadingMore.value = true
        fetchData()
      } else {
        fetchData()
      }
    },
    { debounce: delay }
  )

  watchDebounced(
    [search, perPage, () => ({ ...reactiveFilterParams.value })],
    () => {
      currentPage.value = 1
      fetchData()
    },
    {
      debounce: 100
    }
  )
  watchDebounced(
    watchSources,
    () => {
      currentPage.value = 1
      fetchData()
    },
    { debounce: delay }
  )
  immediate && fetchData()
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
    refresh: fetchData
  }
}
