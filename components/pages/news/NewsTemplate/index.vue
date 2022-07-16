<script setup lang="ts">
import NewsSearch from "./NewsSearch/index.vue";
import NewsCount from "./NewsCount/index.vue";
import NewsList from "./NewsList/index.vue";
import { useNews } from "./helper";
const { stateSearch, stateList, handleClickSearch } = useNews();
</script>

<template>
  <div class="news">
    <news-search v-model="stateSearch" @click="handleClickSearch" />
    <news-count :count="stateList.count" />
    <news-list :list="stateList.newsList" />
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
