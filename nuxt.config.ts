// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
        BASE_URL: process.env.BASE_URL,
        
    }
  },
  app: {},
  css: [
      'vuetify/lib/styles/main.sass', 
      '@mdi/font/css/materialdesignicons.min.css',
      'assets/styles.scss'
  ],
  build: {
      transpile: ['vuetify'],
  },
  vite: {
      define: {
          'process.env.DEBUG': false,
      }
  },
  modules: [
      [
          '@pinia/nuxt',
          {
              autoImports: [
                  'defineStore',
                  'acceptHMRUpdate',
              ],
          },
      ]
  ]
})
