<script setup lang="ts">
interface Props {
  value?: string
  label: string
  id: string
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

const type = ref('password')
const open = ref(false)

const vmValue = computed({
  get: () => {
    return props.value
  },
  set: (newValue: string) => {
    emit('input', newValue)
  },
})

const handleViewPassword = () => {
  open.value = !open.value
  type.value = open.value ? 'type' : 'password'
}
</script>

<template>
  <label class="v-password">
    <div
      :disabled="disabled"
      class="v-password__content"
      :is-val="vmValue !== ''"
    >
      <input
        :id="id"
        v-model="vmValue"
        :type="type"
        :disabled="disabled"
        class="v-password__content-input"
      />
      <button
        class="v-password__content-view-icon"
        :disabled="disabled"
        type="button"
        @click="handleViewPassword"
      >
        <span v-if="open" class="material-icons"> visibility </span>
        <span v-else class="material-icons"> visibility_off </span>
      </button>
    </div>
    <span class="v-password__label" v-text="label" />
  </label>
</template>

<style lang="postcss" scoped>
.v-password {
  @apply flex flex-col;
  @apply relative;
  @apply mt-6;

  &__content {
    @apply flex;
    @apply grow;
    @apply gap-2;
    @apply px-3 py-2;
    @apply border-b-2;
    @apply border-gray-300;
    @apply bg-white;

    &:focus-within {
      @apply outline-none;
      @apply border-blue-400;
    }

    &:focus-within,
    &[is-val='true'] {
      & + span {
        top: -1.5rem;
        left: 0;
        color: rgba(0, 0, 0);
        @apply text-sm;
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

      &:enabled:focus {
        @apply outline-none;
      }

      &:disabled {
        @apply bg-gray-50;
        @apply text-gray-500;
      }
    }

    &-view-icon {
      @apply flex items-center;

      &:disabled {
        @apply cursor-default;
      }
    }
  }

  &__label {
    @apply absolute;
    top: 0.5rem;
    left: 0.75rem;
    color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-out;
  }
}
</style>
