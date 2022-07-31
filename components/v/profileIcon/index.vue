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
  <div class="v-profile-icon">
    <button class="v-profile-icon__content">
      <div class="profile-icon">
        <span v-text="vbText" />
      </div>
      <span class="material-icons">arrow_drop_down</span>
    </button>
  </div>
</template>

<style lang="postcss">
  .v-profile-icon {
    @apply flex;
    @apply items-center;
    @apply p-0.5;
    @apply h-12;
    @apply w-full;

    &__content {
      @apply p-1;
      @apply flex;
      @apply h-full;
      @apply w-full;
      @apply items-center;

      .profile-icon {
        @apply flex;
        @apply justify-center items-center;
        @apply h-9 w-9;
        @apply rounded-full;
        @apply bg-white;
        @apply border;
      }
    }
  }
</style>
