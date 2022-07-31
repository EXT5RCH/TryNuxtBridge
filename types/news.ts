export interface NewsSearchType {
  keyword: string
  poster: string
  searchStartAt: string
  searchEndAt: string
}

export interface NewsCountType {
  count: number
  total: number
}

export interface NewsItemType {
  id: string
  title: string
  overview: string
  createdAt: string
  updatedAt: string
}

export interface NewsListType {
  count: NewsCountType
  newsList: NewsItemType[]
}
