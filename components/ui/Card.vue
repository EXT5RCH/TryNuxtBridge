<script setup lang="ts">
interface Props {
  id: string
  title: string
  imageUrl?: string
}
withDefaults(defineProps<Props>(), {
  id: '',
  title: '',
  imageUrl: '',
})
</script>

<template>
  <div class="v-card">
    <div class="v-card__content">
      <img v-if="imageUrl" :src="imageUrl" :alt="title" />
    </div>
    <div class="v-card__title">
      <span v-text="title" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.v-card {
  @apply border;
  @apply border-gray-200;
  @apply rounded;
  @apply shrink;
  @apply bg-white;
  @apply h-60 w-[20rem];
  @apply text-sm;

  &:hover {
    @apply bg-gradient-to-r;
    @apply from-blue-200 to-purple-200;
    @apply cursor-pointer;
  }

  &__content {
    @apply mt-2 mx-2;
    height: 12.5rem;
    @apply bg-gray-500;

    img {
      @apply h-full w-full;
      @apply object-cover;
    }
  }

  &__title {
    @apply p-1;
    @apply flex;
    @apply justify-center items-center;
    @apply truncate;
    @apply h-7;
  }
}
</style>
