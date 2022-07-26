<script setup lang="ts">
interface Props {
  id: string;
  title: string;
  imageUrl?: string;
}
withDefaults(defineProps<Props>(), {
  id: "",
  title: "",
  imageUrl: "",
});
</script>

<template>
  <div class="v-card">
    <div class="v-card__title">
      <span v-text="title" />
    </div>
    <div v-if="imageUrl" class="v-card__content">
      <img :src="imageUrl" :alt="title" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.v-card {
  @apply border;
  @apply border-gray-200;
  @apply rounded;
  @apply flex-shrink;
  @apply bg-white;
  @apply h-60;
  min-width: 16rem;

  &:hover {
    @apply bg-gradient-to-r;
    @apply from-blue-200 to-purple-200;
    @apply cursor-pointer;
  }

  &__title {
    @apply px-2 py-1;
  }

  &__content {
    @apply p-1;
  }
}
</style>
