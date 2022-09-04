<script setup lang="ts">
const { loginState, handleLogin } = useSession()
</script>

<template>
  <div class="login">
    <form class="login__content" @submit.prevent="handleLogin">
      <ui-text-field
        id="username"
        v-model="loginState.name"
        class="login__content-username"
        label="ユーザー名"
      />
      <ui-password
        id="password"
        v-model="loginState.password"
        class="login__content-password"
        label="パスワード"
        type="password"
      />
      <ui-button id="btn-login" class="login__content-button" text="ログイン" />
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.login {
  @apply h-full w-full;
  @apply flex flex-col;
  @apply gap-2;
  @apply justify-center items-center;
  @apply bg-gradient-to-r;
  @apply from-blue-100 to-purple-100;

  &__content {
    @apply border;
    @apply border-gray-300;
    @apply flex flex-col;
    @apply justify-center items-center;
    @apply gap-2;
    @apply bg-gray-50;
    @apply w-96;
    @apply h-72;
    @apply shadow-md;

    &-username,
    &-password {
      @apply w-3/4;
    }

    &-button {
      @apply mt-6;
      @apply w-3/4;
    }
  }
}
</style>
