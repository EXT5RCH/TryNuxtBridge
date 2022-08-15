<script setup lang="ts">
import { DataTableColumn } from '@/components/v/DataTable.vue'
const { searchState, listState, handleClickSearch } = useNews()
const { checkSession } = useSession()
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
onBeforeMount(async () => {
  const result = await checkSession()
  if (!result) {
    return
  }
  await handleClickSearch()
})
</script>

<template>
  <div class="news">
    <div class="news__side-menu">
      <news-search v-model="searchState" @click="handleClickSearch" />
    </div>
    <div class="news__main">
      <news-count :count="listState.count" />
      <ui-data-table :columns="columns" :rows="listState.newsList" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.news {
  @apply h-full w-full;
  @apply flex;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;

  &__side-menu {
    @apply flex flex-col;
    @apply w-64;
  }

  &__main {
    width: calc(100% - 16rem);
    @apply p-5;

    :deep(.v-data-table__header) {
      width: calc(100% - 18.5rem);
    }
  }
}
</style>
