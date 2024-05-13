// https://nuxt.com/docs/api/configuration/nuxt-config

import  autoImport  from '@pinia/nuxt'
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore'] },
    ],
  ],
})