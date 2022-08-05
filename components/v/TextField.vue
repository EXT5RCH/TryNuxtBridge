<script setup lang="ts">
interface Props {
  value?: string
  label: string
  id: string
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
  example?: string
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
</script>

<template>
  <label class="v-text-field">
    <span class="v-text-field__label" v-text="label" />
    <div :disabled="disabled" class="v-text-field__content">
      <input
        :id="id"
        v-model="vmValue"
        :type="type"
        :disabled="disabled"
        class="v-text-field__content-input"
      />
    </div>
    <div v-if="!!example" class="v-text-field__example">
      <div class="v-text-field__example-triangle" />
      <div class="v-text-field__example-text">
        <span v-text="`例）${props.example}`" />
      </div>
    </div>
  </label>
</template>

<style lang="postcss" scoped>
.v-text-field {
  @apply flex flex-col;

  &__content {
    @apply flex;
    @apply flex-grow;
    @apply gap-2;
    @apply px-3 py-2;
    @apply border rounded;
    @apply bg-white;

    &:focus-within {
      @apply outline-none;
      @apply border-blue-400;
    }

    &[disabled] {
      @apply bg-gray-50;
      @apply text-gray-500;
    }
    &-input {
      @apply flex;
      @apply flex-grow;
      @apply border-none;

      &:enabled:focus {
        @apply outline-none;

        & + .v-text-field__example {
          @apply block;
        }
      }

      &:disabled {
        @apply bg-gray-50;
        @apply text-gray-500;
      }
    }
  }

  &__example {
    @apply hidden;

    &-triangle {
      @apply w-0 h-0;
      @apply border-gray-700;
      margin-left: 8px;
      border-right: 4px solid transparent;
      border-bottom: 8px solid;
      border-left: 4px solid transparent;
    }

    &-text {
      @apply bg-gray-700;
      @apply text-gray-100;
      @apply p-1;
      @apply text-xs;
      @apply rounded;
      @apply truncate;
    }
  }
}
</style>
