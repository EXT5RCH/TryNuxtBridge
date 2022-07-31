<script setup lang="ts">
  const { categoriesNewsState, fetchCategoriesNews } = useCategoriesNews()
  fetchCategoriesNews()

  const handleChangeTree = (items: any) => {
    categoriesNewsState.value = items
  }
</script>

<template>
  <div class="writing">
    <div class="writing__menu">
      <div class="writing__menu-title">記事一覧</div>
      <div class="writing__menu-new">
        <v-button id="new" class="writing__menu-new-button" text="新規作成" />
      </div>
      <div class="writing__menu-content">
        <v-tree :items="categoriesNewsState" @change="handleChangeTree" />
      </div>
    </div>
    <div class="writing__editor" />
  </div>
</template>

<style lang="postcss">
  .writing {
    @apply flex;
    @apply h-full w-full;
    @apply bg-blue-50;

    &__menu {
      @apply p-2;
      @apply h-full w-60;
      @apply border-t;
      @apply border-r;
      @apply border-b;
      @apply bg-gray-100;

      &-title {
        @apply w-full;
        @apply flex;
        @apply justify-center;
        @apply bg-blue-500;
        @apply border-2;
        @apply border-gray-200;
        @apply font-bold;
        @apply text-gray-50;
        @apply py-1;
      }

      &-new {
        @apply flex;
        @apply py-2;

        &-button {
          @apply flex-grow;
          @apply flex;
          @apply justify-center;
          @apply bg-gray-50;
          @apply shadow;
        }
      }

      &-selector {
        @apply flex;
        @apply py-2;
        @apply gap-2;

        &-item {
          @apply flex-grow;
          @apply flex;
          @apply justify-center;
          @apply bg-gray-50;
          @apply shadow;
        }
      }

      &-content {
        @apply w-full;
        @apply bg-white;
        height: calc(100% - 5.75rem - 4px);
        @apply shadow;
        @apply p-1;
        @apply overflow-scroll;
      }
    }

    &__editor {
      @apply h-full w-0;
      @apply flex-col;
      @apply flex flex-col;
    }
  }
</style>
