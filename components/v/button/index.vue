<script setup lang="ts">
interface Props {
  id: string;
  text: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  text: '',
  disabled: false
})

interface Emits {
  (e: 'click'): void;
}

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.disabled) { return }
  emit('click')
}
</script>

<template>
  <button :id="id" class="v-button" :disabled="disabled" @click="handleClick">
    <span v-text="text" />
  </button>
</template>

<style lang="postcss" scoped>
.v-button {
  @apply border rounded;
  @apply p-2;

  &:enabled {
    @apply bg-gray-700;
    @apply text-gray-100;
  }

  &:disabled {
    @apply bg-gray-500;
    @apply text-gray-200;
  }
}
</style>
