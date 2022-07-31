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

  const fetchNews = async () => {
    await fetchNewsList()
    await fetchNewsCount()
  }

  const fetchNewsList = async () => {
    const res = await fetch('/news', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    listState.value.newsList = await res.json()
  }

  const fetchNewsCount = async () => {
    const res = await fetch('/count/news', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    listState.value.count = await res.json()
  }

  const handleClickSearch = async () => {
    await fetchNews()
  }
  return {
    searchState,
    listState,
    handleClickSearch,
  }
}
