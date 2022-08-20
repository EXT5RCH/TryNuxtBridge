<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

interface MenuItem {
  id?: string
  label: string
  type: 'nLink' | 'link' | 'func'
  linkUrl?: string
  func?: () => void
}

interface Props {
  id?: string
  items: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  items: () => [],
})

const dropDownList = ref()
const handleMouseOver = () => {
  dropDownList.value.removeAttribute('aria-expanded')
  dropDownList.value.setAttribute('aria-expanded', 'true')
}
const handleMouseLeave = (e: MouseEvent) => {
  const div = e.target as HTMLDivElement
  div.removeAttribute('aria-expanded')
  div.setAttribute('aria-expanded', 'false')
}
const vbId = computed(() => {
  return props.id ? props.id : uuidv4()
})
</script>

<template>
  <div
    ref="dropDownList"
    class="drop-down-list"
    @mouseover="handleMouseOver"
    @mouseleave.self="handleMouseLeave"
  >
    <button :id="vbId" class="button" @mouseover="handleMouseOver">
      <slot />
    </button>
    <div class="menu" @mouseover="handleMouseOver">
      <div v-for="item in items" :key="item.label" class="menu__item">
        <a
          v-if="item.type === 'link'"
          :id="`${vbId}-${item.id}`"
          :href="item.linkUrl"
          rel="noopener noreferrer"
        >
          <span v-text="item.label" />
        </a>
        <n-link
          v-if="item.type === 'nLink'"
          :id="`${vbId}-${item.id}`"
          :to="item.linkUrl"
        >
          <span v-text="item.label" />
        </n-link>
        <button
          v-if="item.type === 'func'"
          :id="`${vbId}-${item.id}`"
          @click="item.func"
        >
          <span v-text="item.label" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.drop-down-list {
  @apply flex flex-col;
  @apply items-center;
  @apply p-0.5;
  @apply h-12;

  .button {
    @apply p-1;
    @apply flex;
    @apply items-center;
    @apply relative;
    z-index: 11;
  }

  .menu {
    @apply hidden;
  }

  &[aria-expanded='true'] {
    .menu {
      @apply flex flex-col;
      @apply bg-white;
      @apply w-full;
      @apply cursor-pointer;
      @apply border;
      z-index: 11;

      &__item {
        @apply flex;
        @apply w-full;
        @apply p-1;

        &:nth-child(n + 2) {
          @apply border-t;
        }

        a,
        button {
          @apply flex;
          @apply items-center;
          @apply h-full w-full;
          @apply truncate;

          span {
            @apply truncate;
            @apply text-sm;
          }
        }
      }
    }
  }
}
</style>
