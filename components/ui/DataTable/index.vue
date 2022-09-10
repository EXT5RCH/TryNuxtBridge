<script setup lang="ts">
import { DataTableColumn, DataTableRow, LimitItem } from './type'
interface Props {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  limit?: number | null
  items?: LimitItem[]
  totalPage: number
  currentPage: number
  totalCount: number
  count: number
}
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  limit: null,
  items: () => [{ label: 'all', limit: null }],
  totalPage: 1,
  currentPage: 1,
  totalCount: 0,
  count: 0,
})
interface Emits {
  (e: 'change:limiter', limit: number | null): void
  (e: 'click:navigator', page: number): void
}
const emits = defineEmits<Emits>()
const onClickLimiter = (limit: number | null) => {
  emits('change:limiter', limit)
}
const onClickNavigator = (page: number) => {
  emits('click:navigator', page)
}
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
      class="header"
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
    <div class="separate" />
    <div v-if="rows.length > 0" class="body">
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
    <div v-else class="body">
      <div class="row text-xs">No Data...</div>
    </div>
    <div class="footer">
      <ui-data-table-limiter
        :limit="limit"
        :items="items"
        @change="onClickLimiter"
      />
      <ui-data-table-navigator
        :total-page="totalPage"
        :current-page="currentPage"
        @click="onClickNavigator"
      />
      <ui-data-table-counter :count="count" :total-count="totalCount" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.v-data-table {
  @apply w-full max-h-full;
  @apply flex flex-col;
  @apply text-sm;
  @apply border;
  @apply rounded;
  @apply shadow-sm;
  background: linear-gradient(
    to bottom,
    rgb(59 130 246) 1.75rem,
    white 1.75rem
  );

  .header {
    @apply grid;
    @apply gap-2;
    @apply px-7 py-1;
    @apply mr-[15px];
    @apply text-gray-100;

    .column {
      @apply flex;

      &-text {
        @apply truncate;
      }
    }
  }

  .separate {
    @apply border-y;
    @apply h-1;
  }

  .body {
    @apply overflow-y-scroll;
    @apply max-h-[580px];

    .row {
      @apply grid;
      @apply gap-2;
      @apply px-5 py-1;
      @apply border-b;
      @apply border-gray-200;
      @apply mx-2;

      &:last-child {
        @apply border-none;
      }

      &-item {
        @apply flex;

        &-text {
          @apply truncate;
        }
      }
    }
  }

  .footer {
    @apply border-t;
    @apply px-2;
    @apply border-gray-200;
    @apply w-full;
    @apply flex;
    @apply justify-between items-center;
    @apply flex-wrap;
  }
}
</style>
