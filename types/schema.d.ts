import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
  }
  interface RuntimeConfig {
     public: any,

    app: {
        basePath: string,

        assetsPath: string,

        cdnURL: string,

        buildAssetsDir: string,

        baseURL: string,
    },
  }
}