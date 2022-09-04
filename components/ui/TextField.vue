<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

interface Props {
  value?: string
  label: string
  id?: string
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'tel'
    | 'text'
    | 'url'
    | 'search'
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
  label: '',
  id: '',
  type: 'text',
  disabled: false,
})

interface Emits {
  (e: 'input', newValue: string): void
}
const emit = defineEmits<Emits>()

const vmValue = computed({
  get: () => {
    return props.value
  },
  set: (newValue: string) => {
    emit('input', newValue)
  },
})

const vbId = computed(() => {
  return props.id ? props.id : uuidv4()
})
</script>

<template>
  <label class="v-text-field">
    <div
      :disabled="disabled"
      class="v-text-field__content"
      :is-val="vmValue !== ''"
    >
      <input
        :id="vbId"
        v-model="vmValue"
        :type="type"
        :disabled="disabled"
        class="v-text-field__content-input"
      />
    </div>
    <span class="v-text-field__label" v-text="label" />
  </label>
</template>

<style lang="postcss" scoped>
.v-text-field {
  @apply flex flex-col;
  @apply relative;
  @apply mt-6;

  &__content {
    @apply flex;
    @apply grow;
    @apply gap-2;
    @apply px-2 py-1;
    @apply border-b-2;
    @apply border-gray-700;
    @apply bg-white;

    &:focus-within {
      @apply outline-none;
      @apply border-blue-400;
    }

    &:focus-within,
    &[is-val='true'] {
      & > input {
        @apply opacity-100;
      }

      & + span {
        top: -1.25rem;
        left: 0;
        color: rgba(0, 0, 0);
        @apply text-xs;
      }
    }

    &[disabled] {
      @apply bg-gray-50;
      @apply text-gray-500;
    }

    &-input {
      @apply flex;
      @apply grow;
      @apply border-none;
      @apply opacity-0;
      @apply text-sm;

      &:enabled:focus {
        @apply outline-none;
      }

      &:autofill {
        transition: background-color 5000s ease-in-out 0s !important;
      }

      &:disabled {
        @apply bg-gray-50;
        @apply text-gray-500;
      }
    }
  }

  &__label {
    @apply absolute;
    @apply text-sm;
    top: 0.25rem;
    left: 0.5rem;
    color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-out;
  }
}
</style>
