<script setup lang="ts">
import { NewsItemType } from "~/types/news";
interface Props {
  item: NewsItemType;
  disabled: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({
    id: "",
    title: "",
    overview: "",
    createdAt: "",
    updatedAt: "",
  }),
  disabled: false,
});

interface Emits {
  (e: "click", id: string): void;
}
const emit = defineEmits<Emits>();

const handleClick = (id: string) => {
  if (props.disabled) return;
  emit("click", id);
};
</script>

<template>
  <div class="news-item" :disabled="disabled" @click="handleClick(item.id)">
    <div class="news-item__content">
      <span
        v-text="item.title"
        :title="item.title"
        class="news-item__content-title"
      />
      <span
        v-text="item.overview"
        :title="item.overview"
        class="news-item__content-overview"
      />
      <span
        v-text="item.createdAt"
        :title="item.createdAt"
        class="news-item__content-createdAt"
      />
      <span
        v-text="item.updatedAt"
        :title="item.updatedAt"
        class="news-item__content-updatedAt"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.news-item {
  @apply px-5 py-2;
  @apply bg-gray-50;
  @apply border;

  &__content {
    @apply flex;
    @apply gap-2;
    @apply grid grid-cols-8;

    &-title {
      @apply col-span-2;
      @apply truncate;
    }
    &-overview {
      @apply col-span-4;
      @apply truncate;
    }

    &-createdAt,
    &-updatedAt {
      @apply col-span-1;
      @apply truncate;
    }
  }
}
</style>
