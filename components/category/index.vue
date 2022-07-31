<script setup lang="ts">
const { categoriesState, fetchCategories } = useCategories()
fetchCategories()
</script>

<template>
  <div class="category">
    <v-card v-for="i in categoriesState" :key="i.id" v-bind="i" />
  </div>
</template>

<style lang="postcss" scoped>
.category {
  @apply h-full w-full;
  @apply flex flex-wrap;
  @apply justify-center items-center;
  @apply bg-blue-50;
  @apply p-5;
  @apply gap-5;
  @apply overflow-scroll;
}
</style>
