<script setup lang="ts">
import { NewsSearchType } from '~/types/news'

interface Props {
  value?: NewsSearchType
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ({
    keyword: '',
    poster: '',
    searchStartAt: '',
    searchEndAt: '',
  }),
})

interface Emits {
  (e: 'click'): void
  (e: 'input', value: NewsSearchType): void
}
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}

const vmKeyword = computed({
  get: () => {
    return props.value.keyword
  },
  set: (keyword: string) => {
    update({ keyword })
  },
})
const vmPoster = computed({
  get: () => {
    return props.value.poster
  },
  set: (poster: string) => {
    update({ poster })
  },
})
const vmSearchStartAt = computed({
  get: () => {
    return props.value.searchStartAt
  },
  set: (searchStartAt: string) => {
    update({ searchStartAt })
  },
})
const vmSearchEndAt = computed({
  get: () => {
    return props.value.searchEndAt
  },
  set: (searchEndAt: string) => {
    update({ searchEndAt })
  },
})
const update = (value: Partial<NewsSearchType>) =>
  emit('input', { ...props.value, ...value })
</script>

<template>
  <div class="news-search">
    <v-text-field
      id="keyword"
      v-model="vmKeyword"
      label="文章内検索（部分一致）"
      type="search"
      class="news-search__content-input-keyword"
    />
    <v-text-field
      id="poster"
      v-model="vmPoster"
      label="投稿者（部分一致）"
      type="search"
      class="news-search__content-input-poster"
    />
    <v-text-field
      id="search-start-at"
      v-model="vmSearchStartAt"
      label="検索開始日"
      type="date"
      class="news-search__content-period-start-at"
    />
    <v-text-field
      id="search-end-at"
      v-model="vmSearchEndAt"
      label="検索終了日"
      type="date"
      class="news-search__content-period-end-at"
    />
    <v-button
      id="btn-search"
      text="検索"
      class="news-search__content-button"
      @click="handleClick"
    />
  </div>
</template>

<style lang="postcss" scoped>
.news-search {
  @apply bg-gray-50;
  @apply shadow;
  @apply h-full;
  @apply p-4;

  &__content {
    @apply flex flex-col;
    @apply px-5 py-3;
    @apply gap-2;

    &-input {
      @apply flex;
      @apply flex-col sm:flex-row;
      @apply gap-2;

      &-keyword,
      &-poster {
        @apply w-full;
      }
    }

    &-period {
      @apply flex;
      @apply flex-col sm:flex-row;
      @apply gap-2;

      &-start-at,
      &-end-at {
        @apply w-full;
      }
    }

    &-button {
      @apply mt-4;
      @apply w-full;
    }
  }
}
</style>
