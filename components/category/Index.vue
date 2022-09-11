<script setup lang="ts">
const { categoriesState, fetchCategories } = useCategories()
const { checkSession } = useSession()
onBeforeMount(async () => {
  const result = await checkSession()
  if (!result) {
    return
  }
  await fetchCategories()
})
</script>

<template>
  <div class="category">
    <div class="category__main">
      <ui-card v-for="i in categoriesState" :key="i.id" v-bind="i" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.category {
  @apply h-full w-full;
  @apply flex;
  @apply justify-center;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;
  @apply overflow-y-scroll;

  &__main {
    @apply w-full lg:w-[1024px];
    @apply flex flex-wrap;
    @apply justify-center;
    @apply py-5;
    @apply gap-5;
  }
}
</style>
