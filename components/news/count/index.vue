<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import { NewsCountType } from '~/types/news'

  interface Props {
    count: NewsCountType
  }
  const props = withDefaults(defineProps<Props>(), {
    count: () => ({
      count: 0,
      total: 0,
    }),
  })

  const countText = computed(
    () => `検索結果 ${props.count.count}件 / ${props.count.total}件`
  )
</script>

<template>
  <div class="news-count">
    <span v-text="countText" />
  </div>
</template>

<style lang="postcss" scoped>
  .news-count {
    @apply flex;
    @apply justify-center items-center;
  }
</style>
