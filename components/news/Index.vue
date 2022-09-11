<script setup lang="ts">
import { DataTableColumn, LimitItem } from '@/components/ui/DataTable/type'
import { NewsSearchType } from '~/types/news'
const route = useRoute()
const page = ref(route.query.page ?? 1)
const limit = ref(route.query.limit ?? 20)
const searchState: NewsSearchType = ref({
  keyword: '',
  poster: '',
  searchStartAt: '',
  searchEndAt: '',
})
const columns: DataTableColumn[] = [
  {
    code: 'id',
    label: 'No',
    colspan: 1,
  },
  {
    code: 'title',
    label: 'タイトル',
    colspan: 2,
  },
  { code: 'overview', label: '概要', colspan: 3 },
  { code: 'createdAt', label: '作成日時', colspan: 1 },
  { code: 'updatedAt', label: '更新日時', colspan: 1 },
]
const items: LimitItem[] = [
  { label: '20', limit: 20 },
  { label: '50', limit: 50 },
  { label: '100', limit: 100 },
]
const {
  pending,
  data: listState,
  refresh,
} = useLazyFetch('/api/v1/news', {
  onRequest(ctx: any) {
    ctx.options.params = {
      limit: limit.value,
      page: page.value,
    }
  },
})
const onChangeLimiter = (e: number | null) => {
  limit.value = e
  page.value = 1
  return refresh()
}
const onClickNavigator = (e: number) => {
  page.value = e
  return refresh()
}
const onSearch = () => {
  return refresh()
}
const totalPage = computed(() => {
  if (!listState.value.totalCount) {
    return 1
  }
  return Math.ceil(listState.value.totalCount / limit.value)
})
onBeforeMount(() => {
  onSearch()
})
</script>

<template>
  <div v-if="pending">Loading ...</div>
  <div v-else class="news">
    <div class="news__header">
      <news-search v-model="searchState" @click="onSearch" />
    </div>
    <div class="news__main">
      <ui-data-table
        :columns="columns"
        :rows="listState.newsList"
        :limit="limit"
        :items="items"
        :total-page="totalPage"
        :current-page="page"
        :count="listState.count"
        :total-count="listState.totalCount"
        @change:limiter="onChangeLimiter"
        @click:navigator="onClickNavigator"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.news {
  @apply h-full w-full;
  @apply flex flex-col;
  @apply items-center;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;
  @apply py-2;
  @apply gap-2;
  @apply overflow-auto;

  &__header {
    @apply flex flex-col;
    @apply w-full lg:w-[1024px];
    @apply px-1;
  }

  &__main {
    @aplly h-full;
    @apply flex flex-col;
    @apply gap-1;
    @apply w-full lg:w-[1024px];
    @apply px-1;
  }
}
</style>
