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
    <v-accordion label="記事検索" class="news-search__content">
      <template>
        <div class="news-search__content-input">
          <v-textbox
            id="keyword"
            v-model="vmKeyword"
            label="文章内検索（部分一致）"
            class="news-search__content-input-keyword"
          />
          <v-textbox
            id="poster"
            v-model="vmPoster"
            label="投稿者（部分一致）"
            class="news-search__content-input-poster"
          />
        </div>
        <div class="news-search__content-period">
          <v-textbox
            id="search-start-at"
            v-model="vmSearchStartAt"
            label="検索開始日"
            type="date"
            class="news-search__content-period-start-at"
          />
          <v-textbox
            id="search-end-at"
            v-model="vmSearchEndAt"
            label="検索終了日"
            type="date"
            class="news-search__content-period-end-at"
          />
        </div>
        <v-button
          id="btn-search"
          text="検索"
          class="news-search__content-button"
          @click="handleClick"
        />
      </template>
    </v-accordion>
  </div>
</template>

<style lang="postcss" scoped>
  .news-search {
    @apply bg-gray-50;
    @apply border;
    @apply border-gray-300;
    @apply shadow;

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
