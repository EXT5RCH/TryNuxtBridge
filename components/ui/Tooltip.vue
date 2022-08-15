<script setup lang="ts">
interface Props {
  label: string
}
withDefaults(defineProps<Props>(), {
  label: '',
})

const message = ref()
const style = computed(() => {
  return message.value
    ? `margin-left: calc(${-1 * (message.value.clientWidth / 2)}px + 0.5rem)`
    : 'margin-left: 0'
})
</script>

<template>
  <div ref="tooltip" class="v-tooltip">
    <div ref="message" :style="style" class="v-tooltip__message">
      <div class="triangle" />
      <div class="message">
        <span class="message-label" v-text="label" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.v-tooltip {
  @apply m-0 p-0;
  @apply relative;

  .v-tooltip__message {
    @apply opacity-0;
    @apply absolute;
    @apply top-full;
    left: calc(50% - 0.75rem);
  }

  &:hover {
    .v-tooltip__message {
      @apply flex flex-col;
      @apply justify-center items-center;
      @apply visible;
      @apply opacity-100;
      animation-name: fade-in;
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;

      .triangle {
        width: 0;
        height: 0;
        @apply border-gray-50;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid rgb(17, 24, 39, 0.5);
        margin-left: -8px;
      }

      .message {
        background-color: rgb(17, 24, 39, 0.5);
        @apply text-gray-50;
        @apply py-1 px-2;
        @apply rounded-lg;
      }
    }

    @keyframes fade-in {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
