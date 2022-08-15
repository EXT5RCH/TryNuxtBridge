import { TreeItemType } from '~/types/tree'

export function useCategoriesNews() {
  const categoriesNewsState = ref<TreeItemType[]>([])

  const fetchCategoriesNews = async () => {
    const res = await fetch('/api/v1/categories_news', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    categoriesNewsState.value = await res.json()
  }

  return { categoriesNewsState, fetchCategoriesNews }
}
