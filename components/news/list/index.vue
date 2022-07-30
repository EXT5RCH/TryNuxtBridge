<script setup lang="ts">
import { NewsItemType } from '~/types/news'

interface Props {
  list: NewsItemType[];
}
withDefaults(defineProps<Props>(), {
  list: () => []
})
const header = {
  id: 'header',
  title: 'タイトル',
  overview: '概要',
  createdAt: '作成日時',
  updatedAt: '更新日時'
}
</script>

<template>
  <div class="news-list">
    <news-list-item :item="header" :disabled="true" class="news-list__header" />
    <div class="news-list__body">
      <news-list-item
        v-for="v in list"
        :key="v.id"
        :item="v"
        :disabled="false"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.news-list {
  @apply overflow-auto;
  @apply gap-5;
  @apply w-full;

  &__header {
    @apply bg-gradient-to-r;
    @apply from-blue-500 to-purple-500;
    @apply text-gray-100;
    @apply fixed;
    width: calc(100% - 2.5rem);
  }

  &__body {
    @apply pt-10;
  }
}
</style>
