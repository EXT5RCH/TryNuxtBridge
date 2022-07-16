<script setup lang="ts">
import { VButton, VTextbox } from "@/components/uiParts";
import { useLogin } from "./helper";
const { name, password, handleClick } = useLogin();
</script>

<template>
  <div class="login">
    <div class="login__content">
      <div class="login__content-title">ログイン</div>
      <v-textbox
        class="login__content-username"
        id="username"
        label="ユーザー名"
        v-model="name"
      />
      <v-textbox
        class="login__content-password"
        id="password"
        label="パスワード"
        type="password"
        v-model="password"
      />
      <v-button
        id="btn-login"
        class="login__content-button"
        text="ログイン"
        @click="handleClick"
      />
    </div>
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
    @apply flex flex-col;
    @apply justify-center items-center;
    @apply gap-8;
    @apply bg-white;
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
