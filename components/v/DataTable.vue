<script setup lang="ts">
export interface DataTableColumn {
  code: string
  label: string
  colspan: number
}
interface DataTableRow {
  [key: string]: string
}
interface Props {
  columns: DataTableColumn[]
  rows: DataTableRow[]
}
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
})
const totalColSpan = computed(() => {
  return props.columns.reduce((pre, cur) => ({
    code: '',
    label: '',
    colspan: pre.colspan + cur.colspan,
  })).colspan
})
</script>

<template>
  <div class="v-data-table">
    <div
      class="v-data-table__header"
      :style="`grid-template-columns: repeat(${totalColSpan}, minmax(0, 1fr))`"
    >
      <div
        v-for="col in columns"
        :key="col.code"
        class="column"
        :style="`grid-column: span ${col.colspan}`"
      >
        <span class="column-text" v-text="col.label" />
      </div>
    </div>
    <div class="v-data-table__body">
      <div
        v-for="(row, rowIdx) in rows"
        :key="rowIdx"
        class="row"
        :style="`grid-template-columns: repeat(${totalColSpan}, minmax(0, 1fr))`"
      >
        <div
          v-for="col in columns"
          :key="col.code"
          class="row-item"
          :style="`grid-column: span ${col.colspan} / span ${col.colspan}`"
        >
          <span class="row-item-text" v-text="row[col.code]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.v-data-table {
  @apply overflow-auto;
  @apply gap-5;
  @apply w-full;

  &__header {
    @apply grid;
    @apply gap-2;
    @apply fixed;
    @apply bg-gradient-to-r;
    @apply from-blue-500 to-purple-500;
    @apply text-gray-100;
    @apply px-5 py-2;
    @apply border;

    .column {
      @apply flex;

      &-text {
        @apply truncate;
      }
    }
  }

  &__body {
    @apply pt-10;

    .row {
      @apply grid;
      @apply gap-2;
      @apply px-5 py-2;
      @apply border;
      @apply bg-gray-50;

      &-item {
        @apply flex;

        &-text {
          @apply truncate;
        }
      }
    }
  }
}
</style>
