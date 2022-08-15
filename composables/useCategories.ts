import { CategoryType } from '~/types/categories'

export function useCategories() {
  const categoriesState = ref<CategoryType[]>([])

  const fetchCategories = async () => {
    const res = await fetch('/api/v1/categories', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    categoriesState.value = await res.json()
  }

  return { categoriesState, fetchCategories }
}
