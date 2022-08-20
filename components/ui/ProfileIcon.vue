<script setup lang="ts">
interface Props {
  text?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: 'あ',
})
const vbText = props.text.length > 0 ? props.text.substring(0, 1) : 'あ'
</script>

<template>
  <div class="profile-icon">
    <span v-text="vbText" />
  </div>
</template>

<style lang="postcss" scoped>
.profile-icon {
  @apply flex;
  @apply justify-center items-center;
  @apply h-9 w-9;
  @apply rounded-full;
  @apply bg-white;
  @apply border;
}
</style>
