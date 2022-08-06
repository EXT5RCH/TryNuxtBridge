<template>
  <div class="layout">
    <div class="header">
      <div class="header__left">
        <div class="logo">
          <div class="logo__content">ロゴを設定</div>
        </div>
        <nuxt-link to="/news" class="menu">
          <span>ユーザー側へ移動</span>
        </nuxt-link>
      </div>
    </div>
    <div class="body">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.layout {
  @apply h-full w-full;

  .header {
    @apply h-12;
    @apply bg-gray-900;
    @apply text-gray-50;
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
        @apply text-center;

        &:hover {
          @apply rounded;
          @apply bg-gray-700;
          @apply cursor-pointer;
        }
      }
    }

    &__right {
      @apply h-full;
    }
  }

  .body {
    @apply flex;
    height: calc(100% - 3rem);
  }
}
</style>
