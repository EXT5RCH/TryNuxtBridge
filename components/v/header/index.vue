<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="header__left">
      <div class="logo">
        <div class="logo__content">ロゴを設定</div>
      </div>
      <div class="menu">
        <nuxt-link to="/news">記事</nuxt-link>
      </div>
      <div class="menu">
        <nuxt-link to="/category">カテゴリ</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.header {
  @apply h-10;
  @apply bg-white;
  @apply flex;
  @apply justify-between items-center;

  &__left {
    @apply flex;
    @apply items-center;

    .logo {
      @apply p-2;
      @apply w-32;
      @apply justify-center items-center;

      &__content {
        @apply w-full;
        @apply text-center;
        @apply font-bold;
      }
    }

    .menu {
      @apply p-1;
      @apply w-16;
      @apply text-center;

      &:hover {
        @apply rounded;
        @apply bg-gray-100;
      }
    }
  }
}
</style>
