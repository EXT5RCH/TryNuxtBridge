<script setup lang="ts">
import { computed } from "@vue/reactivity";

interface Props {
  modelValue?: string;
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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  id: "",
  type: "text",
  disabled: false,
});

interface Emits {
  (e: "input", value: string): void;
}

const emit = defineEmits<Emits>();

const vmValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value: string) => {
    emit("input", value);
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
  </label>
</template>

<style lang="postcss" scoped>
.v-textbox {
  @apply gap-2;
  @apply flex flex-col;

  &__input {
    @apply border rounded;
    @apply px-2 py-1;

    &:enabled:focus {
      @apply outline-none;
      @apply border-blue-400;
    }

    &:disabled {
      @apply bg-gray-50;
      @apply text-gray-500;
    }
  }
}
</style>
