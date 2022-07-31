<script setup lang="ts">
const { searchState, listState, handleClickSearch } = useNews()
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
