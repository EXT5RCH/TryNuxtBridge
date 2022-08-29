<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

interface Props {
  id?: string
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

const vbId = computed(() => {
  return props.id ? props.id : uuidv4()
})
</script>

<template>
  <button
    :id="vbId"
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
  @apply border rounded-full;
  @apply text-sm;
  @apply p-1;

  &:enabled[mode='primary'] {
    @apply bg-gray-700;
    @apply text-gray-100;

    &:focus,
    &:hover {
      @apply outline-none;
      @apply border-2;
      @apply border-blue-400;
    }
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
