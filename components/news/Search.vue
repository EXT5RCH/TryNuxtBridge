<script setup lang="ts">
import { NewsSearchType } from '~/types/news'

interface Props {
  value?: NewsSearchType
}
withDefaults(defineProps<Props>(), {
  value: () => ({
    keyword: '',
    poster: '',
    searchStartAt: '',
    searchEndAt: '',
  }),
})

interface Emits {
  (e: 'click'): void
}
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="news-search">
    <div class="current-search-terms" />
    <button id="btn-search" class="current-search-button" @click="handleClick">
      検索
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.news-search {
  @apply flex;
  @apply items-center;
  @apply w-full;
  @apply p-1;
  @apply rounded;
  @apply bg-gray-50;
  @apply text-xs;
  @apply gap-1;

  .current-search {
    &-terms {
      @apply flex grow;
      @apply truncate;
      @apply w-full;

      span {
        @apply truncate;
      }
    }

    &-button {
      @apply bg-gray-700;
      @apply text-gray-100;
      @apply p-1;
      @apply rounded;
      @apply w-20;
    }
  }
}
</style>
