<script setup lang="ts">
const categoryState = ref([]);
categoryState.value = [...Array(100).keys()].map((v) => ({
  id: v.toString(),
  title: `カテゴリ${v + 1}`,
}));
</script>

<template>
  <div class="category">
    <v-card v-for="i in categoryState" :key="i.id" v-bind="i" />
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
