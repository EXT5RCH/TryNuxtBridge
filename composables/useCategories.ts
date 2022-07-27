import { CategoryType } from "~/types/categories";

export function useCategories() {
  const stateCategories = ref<CategoryType[]>([]);

  const fetchCategories = async () => {
    const res = await fetch("/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    stateCategories.value = await res.json();
  };

  return { stateCategories, fetchCategories };
}
