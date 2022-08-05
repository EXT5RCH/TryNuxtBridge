<script setup lang="ts">
interface contextMenuItem {
  label: string
  type: 'nLink' | 'link' | 'func'
  linkUrl?: string
  func?: () => void
}

interface Props {
  items: contextMenuItem[]
}

withDefaults(defineProps<Props>(), {
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
</script>

<template>
  <div
    ref="dropDownList"
    class="drop-down-list"
    @mouseover="handleMouseOver"
    @mouseleave.self="handleMouseLeave"
  >
    <button class="button" @mouseover="handleMouseOver">
      <slot />
    </button>
    <div class="context-menu" @mouseover="handleMouseOver">
      <div v-for="item in items" :key="item.label" class="context-menu__item">
        <a
          v-if="item.type === 'link'"
          :href="item.linkUrl"
          rel="noopener noreferrer"
        >
          <span v-text="item.label" />
        </a>
        <n-link v-if="item.type === 'nLink'" :to="item.linkUrl">
          <span v-text="item.label" />
        </n-link>
        <button v-if="item.type === 'func'" @click="item.func">
          <span v-text="item.label" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
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

  .context-menu {
    @apply hidden;
  }

  &[aria-expanded='true'] {
    .context-menu {
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
