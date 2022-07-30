<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="header__left">
      <div class="logo">
        <div class="logo__content">
          ロゴを設定
        </div>
      </div>
      <nuxt-link to="/news" class="menu">
        <span>記事</span>
      </nuxt-link>
      <nuxt-link to="/category" class="menu">
        <span>カテゴリ</span>
      </nuxt-link>
      <nuxt-link to="/writing" class="menu">
        <span>執筆</span>
      </nuxt-link>
    </div>
    <div class="header__right">
      <v-profile-icon />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.header {
  @apply h-12;
  @apply bg-white;
  @apply flex;
  @apply justify-between items-center;

  &__left {
    @apply flex;
    @apply items-center;
    @apply h-full;

    .logo {
      @apply px-2 py-1;
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
        @apply cursor-pointer;
      }
    }
  }

  &__right {
    @apply h-full;
  }
}
</style>
