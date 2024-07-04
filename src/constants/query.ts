export const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  retry: false,
}

export const INITIAL_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      ...DEFAULT_QUERY_OPTIONS,
      staleTime: 1000,
    },
  },
}