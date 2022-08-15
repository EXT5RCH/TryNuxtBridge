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
    <ui-card v-for="i in categoriesState" :key="i.id" v-bind="i" />
  </div>
</template>

<style lang="postcss" scoped>
.category {
  @apply h-full w-full;
  @apply flex flex-wrap;
  @apply justify-center items-center;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;
  @apply p-5;
  @apply gap-5;
  @apply overflow-scroll;
}
</style>
