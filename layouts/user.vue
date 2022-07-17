<template>
  <div class="layout">
    <div class="header">ヘッダー</div>
    <div class="body">
      <Nuxt />
    </div>
    <div class="footer">フッター</div>
  </div>
</template>

<style lang="postcss" scoped>
.layout {
  @apply h-full w-full;
  .header {
    @apply h-6;
    @apply bg-white;
    @apply flex;
    @apply justify-center items-center;
  }

  .body {
    @apply flex;
    height: calc(100% - 3rem);
  }

  .footer {
    @apply bottom-0;
    @apply flex;
    @apply justify-center items-center;
    @apply h-6;
    @apply w-full;
    @apply bg-gray-900;
    @apply text-gray-200;
  }
}
</style>
