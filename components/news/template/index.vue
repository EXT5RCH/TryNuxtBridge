<script setup lang="ts">
const { searchState, listState, handleClickSearch } = useNews();
</script>

<template>
  <div class="news">
    <news-template-search v-model="searchState" @click="handleClickSearch" />
    <news-template-count :count="listState.count" />
    <news-template-list :list="listState.newsList" />
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
