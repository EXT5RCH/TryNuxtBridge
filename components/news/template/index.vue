<script setup lang="ts">
import { useNews } from "./helper";
const { stateSearch, stateList, handleClickSearch } = useNews();
</script>

<template>
  <div class="news">
    <news-template-search v-model="stateSearch" @click="handleClickSearch" />
    <news-template-count :count="stateList.count" />
    <news-template-list :list="stateList.newsList" />
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
