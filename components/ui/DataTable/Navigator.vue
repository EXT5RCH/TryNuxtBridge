<script setup lang="ts">
interface Props {
  totalPage: number
  currentPage: number
}
const props = withDefaults(defineProps<Props>(), {
  totalPage: 1,
  currentPage: 1,
})
interface Emits {
  (e: 'click', page: number): void
}
const emit = defineEmits<Emits>()

const onClickFirst = () => {
  emit('click', 1)
}
const onClickPrevious = () => {
  emit('click', props.currentPage - 1)
}
const onClickNext = () => {
  emit('click', props.currentPage + 1)
}
const onClickLast = () => {
  emit('click', props.totalPage)
}
</script>

<template>
  <div class="v-navigator">
    <button class="item" :disabled="currentPage <= 1" @click="onClickFirst">
      <span class="material-icons">keyboard_double_arrow_left</span>
    </button>
    <button class="item" :disabled="currentPage <= 1" @click="onClickPrevious">
      <span class="material-icons">chevron_left</span>
    </button>
    <button
      class="item"
      :disabled="currentPage >= totalPage"
      @click="onClickNext"
    >
      <span class="material-icons">chevron_right</span>
    </button>
    <button
      class="item"
      :disabled="currentPage >= totalPage"
      @click="onClickLast"
    >
      <span class="material-icons">keyboard_double_arrow_right</span>
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.v-navigator {
  @apply flex;
  @apply items-center;
  @apply gap-1;
  @apply px-2;

  .item {
    @apply flex;
    @apply justify-center items-center;
    @apply h-6 w-6;
    @apply border;
    @apply bg-white;

    .current {
      @apply cursor-default;
    }

    .material-icons {
      @apply text-base;
    }

    &:enabled:hover {
      @apply bg-blue-500;
      @apply text-gray-50;
    }

    &:disabled {
      @apply invisible;
    }
  }

  input[type='number'] {
    @apply flex;
    @apply justify-center items-center;
    @apply h-6 w-10;
    @apply border;
    @apply bg-white;
    @apply px-1;
    @apply outline-none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      -moz-appearance: textfield;
    }
  }
}
</style>
