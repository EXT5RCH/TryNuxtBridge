import { CategoryType } from "~/types/categories";

export function useCategories() {
  const categoriesState = ref<CategoryType[]>([]);

  const fetchCategories = async () => {
    const res = await fetch("/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    categoriesState.value = await res.json();
  };

  return { categoriesState, fetchCategories };
}
