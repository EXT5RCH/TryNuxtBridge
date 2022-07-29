<script setup lang="ts">
import { computed } from "@vue/reactivity";

interface Props {
  value?: string;
  label: string;
  id: string;
  type?:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "password"
    | "tel"
    | "text"
    | "url";
  disabled?: boolean;
  example?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  label: "",
  id: "",
  type: "text",
  disabled: false,
});

interface Emits {
  (e: "input", newValue: string): void;
}

const emit = defineEmits<Emits>();

const vmValue = computed({
  get: () => {
    return props.value;
  },
  set: (newValue: string) => {
    emit("input", newValue);
  },
});
</script>

<template>
  <label class="v-textbox">
    <span v-text="label" class="v-textbox__label" />
    <input
      v-model="vmValue"
      :id="id"
      :type="type"
      :disabled="disabled"
      class="v-textbox__input"
    />
    <div v-if="!!example" class="v-textbox__example">
      <div class="v-textbox__example-triangle"></div>
      <div class="v-textbox__example-text">
        <span v-text="`例）${props.example}`" />
      </div>
    </div>
  </label>
</template>

<style lang="postcss" scoped>
.v-textbox {
  @apply flex flex-col;

  &__input {
    @apply border rounded;
    @apply px-2 py-1;

    &:enabled:focus {
      @apply outline-none;
      @apply border-blue-400;

      & + .v-textbox__example {
        @apply block;
      }
    }

    &:disabled {
      @apply bg-gray-50;
      @apply text-gray-500;
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
