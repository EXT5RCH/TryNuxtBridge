import { NewsSearchType, NewsListType } from '~/types/news'

export function useNews() {
  const searchState: NewsSearchType = ref({
    keyword: '',
    poster: '',
    searchStartAt: '',
    searchEndAt: '',
  })
  const listState: NewsListType = ref({
    count: {
      count: 0,
      total: 0,
    },
    newsList: [],
  })

  interface NewsParams {
    limit?: number
    page?: number
  }

  const fetchNews = async (params: NewsParams) => {
    const query = new URLSearchParams()
    if (params.limit) {
      query.append('limit', params.limit.toString())
    }
    if (params.page) {
      query.append('page', params.page.toString())
    }
    console.log(`/api/v1/news?${query.toString()}`)
    const url = params ? `/api/v1/news?${query.toString()}` : '/api/v1/news'
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    listState.value = await res.json()
  }

  return {
    searchState,
    listState,
    fetchNews,
  }
}
