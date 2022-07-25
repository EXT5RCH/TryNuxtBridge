<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { NewsSearchType } from "~/types/news";

interface Props {
  modelValue?: NewsSearchType;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    keyword: "",
    poster: "",
    searchStartAt: "",
    searchEndAt: "",
  }),
});

interface Emits {
  (e: "click"): void;
  (e: "update:modelValue", value: NewsSearchType): void;
}
const emit = defineEmits<Emits>();

const handleClick = () => {
  emit("click");
};

const vmKeyword = computed({
  get: () => {
    return props.modelValue.keyword;
  },
  set: (keyword: string) => {
    update({ keyword });
  },
});
const vmPoster = computed({
  get: () => {
    return props.modelValue.poster;
  },
  set: (poster: string) => {
    update({ poster });
  },
});
const vmSearchStartAt = computed({
  get: () => {
    return props.modelValue.searchStartAt;
  },
  set: (searchStartAt: string) => {
    update({ searchStartAt });
  },
});
const vmSearchEndAt = computed({
  get: () => {
    return props.modelValue.searchEndAt;
  },
  set: (searchEndAt: string) => {
    update({ searchEndAt });
  },
});
const update = (value: Partial<NewsSearchType>) =>
  emit("update:modelValue", { ...props.modelValue, ...value });
</script>

<template>
  <div class="news-search">
    <v-accordion label="記事検索" class="news-search__content">
      <template>
        <div class="news-search__content-input">
          <v-textbox
            id="keyword"
            label="文章内検索（部分一致）"
            v-model="vmKeyword"
            class="news-search__content-input-keyword"
          />
          <v-textbox
            id="poster"
            label="投稿者（部分一致）"
            v-model="vmPoster"
            class="news-search__content-input-poster"
          />
        </div>
        <div class="news-search__content-period">
          <v-textbox
            id="search-start-at"
            label="検索開始日"
            type="date"
            v-model="vmSearchStartAt"
            class="news-search__content-period-start-at"
          />
          <v-textbox
            id="search-end-at"
            label="検索終了日"
            type="date"
            v-model="vmSearchEndAt"
            class="news-search__content-period-end-at"
          />
        </div>
        <v-button
          id="btn-search"
          text="検索"
          @click="handleClick"
          class="news-search__content-button"
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

    &-period {
      @apply flex;
      @apply gap-2;

      &-start-at,
      &-end-at {
        @apply w-full;
      }
    }

    &-input {
      @apply flex;
      @apply gap-2;

      &-keyword,
      &-poster {
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
