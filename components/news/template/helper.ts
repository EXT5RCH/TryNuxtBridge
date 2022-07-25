import { NewsSearchType, NewsListType } from "~/types/news";

export function useNews() {
  const stateSearch: NewsSearchType = ref({
    keyword: "",
    poster: "",
    searchStartAt: "",
    searchEndAt: "",
  });
  const stateList: NewsListType = ref({
    count: {
      count: 0,
      total: 0,
    },
    newsList: [],
  });

  const handleClickSearch = () => {
    // TODO 検索処理を実施
    stateList.value.count = {
      count: 3,
      total: 3,
    };
    stateList.value.newsList = [
      {
        id: "1",
        title: "テスト１",
        overview: "テスト記事１です。",
        createdAt: "2022-12-11",
        updatedAt: "2022-12-11",
      },
      {
        id: "2",
        title: "テスト２",
        overview: "テスト記事２です。",
        createdAt: "2022-12-11",
        updatedAt: "2022-12-11",
      },
      {
        id: "3",
        title: "テスト３",
        overview: "テスト記事３です。",
        createdAt: "2022-12-11",
        updatedAt: "2022-12-11",
      },
    ];
  };
  return {
    stateSearch,
    stateList,
    handleClickSearch,
  };
}
