<script setup lang="ts">
const { handleLogout } = useSession()
const menuItems = [
  {
    id: 'logout',
    label: 'ログアウト',
    func: () => handleLogout(),
    type: 'func',
  },
]
</script>

<template>
  <div class="layout">
    <div class="header">
      <div class="header__left">
        <div class="logo">
          <div class="logo__content">ロゴを設定</div>
        </div>
        <nuxt-link to="/news" class="menu">
          <span>記事</span>
        </nuxt-link>
        <nuxt-link to="/category" class="menu">
          <span>カテゴリ</span>
        </nuxt-link>
        <nuxt-link to="/console/writing" class="menu">
          <span>管理側へ移動</span>
        </nuxt-link>
      </div>
      <div class="header__right">
        <ui-drop-down-list
          id="user-header-profile"
          :items="menuItems"
          class="drop-down-list"
        >
          <template>
            <ui-profile-icon />
            <span class="material-icons">arrow_drop_down</span>
          </template>
        </ui-drop-down-list>
      </div>
    </div>
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

      .drop-down-list {
        @apply w-24;
      }
    }
  }

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
