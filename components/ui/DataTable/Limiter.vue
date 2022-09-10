<script setup lang="ts">
import { LimitItem } from './type'
interface Props {
  limit: number | null
  items: LimitItem[]
}
const props = withDefaults(defineProps<Props>(), {
  value: null,
  items: () => [{ label: 'all', limit: null }],
})
interface Emits {
  (e: 'change', limit: number | null): void
}
const emit = defineEmits<Emits>()

const onChange = (e: Event) => {
  if (e.target instanceof HTMLSelectElement) {
    emit('change', Number(e.target.value))
  }
}
const vmLimit = computed(() => {
  return props.limit
})
</script>

<template>
  <div class="v-limiter">
    <select :value="vmLimit" @change="onChange">
      <option v-for="item in items" :key="item.label" :value="item.limit">
        <span v-text="item.label" />
      </option>
    </select>
  </div>
</template>

<style lang="postcss" scoped>
.v-limiter {
  @apply p-1;

  select {
    @apply w-16;
    @apply h-6;
    @apply border;
    @apply outline-none;
  }
}
</style>
