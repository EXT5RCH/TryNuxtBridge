<script setup lang="ts">
const { loginState, handleLogin } = useSession()
</script>

<template>
  <div class="login">
    <form class="login__content" @submit.prevent="handleLogin">
      <div class="login__content-title">ログイン</div>
      <v-text-field
        id="username"
        v-model="loginState.name"
        class="login__content-username"
        label="ユーザー名"
      />
      <v-password
        id="password"
        v-model="loginState.password"
        class="login__content-password"
        label="パスワード"
        type="password"
      />
      <v-button id="btn-login" class="login__content-button" text="ログイン" />
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.login {
  @apply h-full w-full;
  @apply flex;
  @apply justify-center items-center;
  @apply bg-blue-50;

  &__content {
    @apply border rounded;
    @apply border-gray-200;
    @apply flex flex-col;
    @apply justify-center items-center;
    @apply gap-8;
    @apply bg-gray-50;
    @apply shadow;
    width: 1000px;
    height: 640px;

    &-title {
      @apply text-4xl;
    }

    &-username,
    &-password {
      @apply w-1/2;
    }

    &-button {
      @apply mt-4;
      @apply w-1/2;
    }
  }
}
</style>
