<script setup lang="ts">
interface Props {
  label: string
  open?: boolean
}
withDefaults(defineProps<Props>(), {
  label: '',
  open: true,
})
</script>

<template>
  <details :open="open" class="v-accordion">
    <summary v-text="label" />
    <slot />
  </details>
</template>

<style lang="postcss" scoped>
.v-accordion {
  @apply border;
  @apply border-gray-300;
}
</style>
