<script setup lang="ts">
interface Props {
  label: string;
  open?: boolean;
}
withDefaults(defineProps<Props>(), {
  label: '',
  open: true
})
</script>

<template>
  <details :open="open" class="v-accordion">
    <summary v-text="label" />
    <slot />
  </details>
</template>

<style lang="postcss">
.v-accordion {
  @apply border;
  @apply rounded;
}
</style>
