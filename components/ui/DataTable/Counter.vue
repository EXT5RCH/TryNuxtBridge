<script setup lang="ts">
interface Props {
  count: number
  totalCount: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  totalCount: 0,
})

const countText = computed(() => `${props.count} / ${props.totalCount}`)
</script>

<template>
  <div class="counter">
    <span v-text="countText" />
  </div>
</template>

<style lang="postcss" scoped>
.count {
  @apply flex;
  @apply justify-center items-center;
  @apply text-sm;
}
</style>
