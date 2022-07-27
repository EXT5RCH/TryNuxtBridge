<script setup lang="ts">
const { stateCategories, fetchCategories } = useCategories();
fetchCategories();
</script>

<template>
  <div class="category">
    <v-card v-for="i in stateCategories" :key="i.id" v-bind="i" />
  </div>
</template>

<style lang="postcss" scoped>
.category {
  @apply h-full w-full;
  @apply flex;
  @apply grid;
  @apply 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2;
  @apply bg-blue-50;
  @apply p-5;
  @apply gap-5;
  @apply overflow-scroll;
}
</style>
