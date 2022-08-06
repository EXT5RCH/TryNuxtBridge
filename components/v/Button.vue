<script setup lang="ts">
interface Props {
  id: string
  text: string
  disabled?: boolean
  mode?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  text: '',
  disabled: false,
  mode: 'primary',
})

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.disabled) {
    return
  }
  emit('click')
}
</script>

<template>
  <button
    :id="id"
    class="v-button"
    :mode="mode"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-text="text" />
  </button>
</template>

<style lang="postcss" scoped>
.v-button {
  @apply border rounded;
  @apply p-2;

  &:enabled[mode='primary'] {
    @apply bg-gray-700;
    @apply text-gray-100;
  }

  &:enabled[mode='secondary'] {
    @apply bg-gray-300;
    @apply text-gray-900;
  }

  &:disabled {
    @apply bg-gray-500;
    @apply text-gray-200;
  }
}
</style>
