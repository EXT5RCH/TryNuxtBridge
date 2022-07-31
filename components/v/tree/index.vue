<script setup lang="ts">
  interface Props {
    items?: TreeItemType[]
  }
  const props = withDefaults(defineProps<Props>(), {
    items: () => [],
  })

  interface Emits {
    (e: 'change', items: TreeItemType[]): void
  }

  const emit = defineEmits<Emits>()

  const handleClickIcon = (id: string) => {
    const items = props.items.map((v) => {
      return id === v.id ? { ...v, open: !v.open } : v
    })
    emit('change', items)
  }
  const handleChangeTree = (items: TreeItemType[], id: string) => {
    const changedItems = props.items.map((v) => {
      return id === v.id ? { ...v, items } : v
    })
    emit('change', changedItems)
  }
</script>

<template>
  <ul class="v-tree">
    <li v-for="item in items" :key="item.id" class="v-tree__item">
      <div class="v-tree__item-content" @click="handleClickIcon(item.id)">
        <div
          v-if="item.type === 'array' && item.items.length > 0"
          class="v-tree__item-content-icon-list"
        >
          <span v-if="item.open" class="material-icons">arrow_drop_down</span>
          <span v-else class="material-icons">arrow_right</span>
        </div>
        <div v-else class="v-tree__item-content-icon-list">
          <span class="material-icons">drag_handle </span>
        </div>
        <span
          class="v-tree__item-content-label"
          :no-icon="item.type === 'array' && item.items.length <= 0"
          v-text="item.label"
        />
      </div>
      <v-tree
        v-if="item.open && item.type === 'array'"
        :items="item.items"
        :open="item.open"
        class="v-tree__item-tree"
        @change="handleChangeTree($event, item.id)"
      />
    </li>
  </ul>
</template>

<style lang="postcss">
  .v-tree {
    @apply flex flex-col;

    &__item {
      @apply items-center;

      &-content {
        @apply flex;
        @apply cursor-pointer;

        &-icon-list,
        &-icon-handle {
          @apply flex;
        }

        &-icon-list {
          @apply cursor-pointer;
        }

        &-label {
          &[no-icon] {
            @apply pl-6;
          }
        }
      }

      &-tree {
        @apply pl-6;
      }
    }
  }
</style>
