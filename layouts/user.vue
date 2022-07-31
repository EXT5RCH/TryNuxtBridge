<template>
  <div class="layout">
    <v-header />
    <div class="body">
      <Nuxt />
    </div>
    <div class="footer">フッター</div>
  </div>
</template>

<style lang="postcss" scoped>
  .layout {
    @apply h-full w-full;

    .body {
      @apply flex;
      height: calc(100% - 5.5rem);
    }

    .footer {
      @apply bottom-0;
      @apply flex;
      @apply justify-center items-center;
      @apply h-10;
      @apply w-full;
      @apply bg-gray-900;
      @apply text-gray-200;
    }
  }
</style>
