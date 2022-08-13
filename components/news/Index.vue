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
    <news-search v-model="searchState" @click="handleClickSearch" />
    <news-count :count="listState.count" />
    <v-data-table :columns="columns" :rows="listState.newsList" />
  </div>
</template>

<style lang="postcss" scoped>
.news {
  @apply h-full w-full;
  @apply flex flex-col;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;
  @apply p-5;
  @apply gap-5;
}
</style>
