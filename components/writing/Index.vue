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
      <div class="writing__menu-list">
        <div class="title">記事一覧</div>
        <div class="content">
          <ui-tree :items="categoriesNewsState" @change="handleChangeTree" />
        </div>
      </div>
      <div class="writing__menu-new">
        <ui-button id="new" class="writing__menu-new-button" text="新規作成" />
      </div>
    </div>
    <div class="writing__content">
      <div class="writing__content-editor">
        <div class="writing__content-editor-header">
          <div class="title">記事作成</div>
          <div class="buttons">
            <ui-button text="下書き" mode="secondary" />
            <ui-button text="公開" />
          </div>
        </div>
        <div class="writing__content-editor-body">
          <ui-text-field label="タイトル" />
          <div>
            <div>本文</div>
            <div>リッチエディタを配置</div>
          </div>
          <div class="section">
            <div>画像</div>
            <div>画像アップロードのコンポーネントを配置</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.writing {
  @apply flex;
  @apply h-full w-full;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;
  @apply p-4;
  @apply gap-4;

  &__menu {
    @apply flex flex-col;
    @apply h-full w-96;
    @apply gap-4;

    &-list {
      @apply flex flex-col;
      @apply flex-grow;

      .title {
        @apply w-full;
        @apply flex;
        @apply justify-center;
        @apply text-lg;
        @apply bg-gradient-to-r;
        @apply from-blue-500 to-purple-500;
        @apply text-gray-100;
        @apply py-2;
      }

      .content {
        @apply flex-grow;
        @apply bg-white;
        @apply shadow;
        @apply p-1;
        @apply overflow-scroll;
      }
    }

    &-new {
      @apply flex;

      &-button {
        @apply flex-grow;
        @apply flex;
        @apply justify-center;
        @apply bg-gray-50;
        @apply shadow;
      }
    }
  }

  &__content {
    @apply flex;
    @apply flex-grow;

    &-editor {
      @apply flex-grow;
      @apply bg-gray-50;
      @apply border;
      @apply border-gray-300;
      @apply flex flex-col;
      @apply px-4 py-2;
      @apply shadow;

      &-header {
        @apply h-16;
        @apply flex-grow-0;
        @apply flex;
        @apply justify-between items-center;
        @apply border-b-2;
        @apply border-gray-900;
        @apply px-4 p-2;

        .title {
          @apply text-2xl;
        }

        .buttons {
          @apply flex;
          @apply gap-4;
        }
      }

      &-body {
        @apply flex flex-col;
        @apply flex-grow;
        @apply p-4;
        @apply gap-4;
      }
    }
  }
}
</style>
