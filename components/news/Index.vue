<script setup lang="ts">
const { searchState, listState, handleClickSearch } = useNews()
const { checkSession } = useSession()
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
    <news-list :list="listState.newsList" />
  </div>
</template>

<style lang="postcss" scoped>
.news {
  @apply h-full w-full;
  @apply flex flex-col;
  @apply bg-blue-50;
  @apply p-5;
  @apply gap-5;
}
</style>
