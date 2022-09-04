import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'try-nuxt-bridge',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'NuxtBridgeを試してみる',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', property: 'og:title', content: 'try-nuxt-bridge' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'NuxtBridgeを試してみる',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://ext5rch.github.io/TryNuxtBridge/',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://source.unsplash.com/OqtafYT5kTw',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'TryNuxtBridge',
      },
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css', 'material-icons/iconfont/material-icons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/mock', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'tailwindcss/nesting': {},
        'postcss-nested': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
})
