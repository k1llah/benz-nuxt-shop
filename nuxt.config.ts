// https://nuxt.com/docs/api/configuration/nuxt-config
import  autoImport  from '@pinia/nuxt'
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [[
    '@pinia/nuxt',
    {
      autoImports: ['defineStore']
    }
  ], "@nuxtjs/tailwindcss", '@formkit/auto-animate', '@vueuse/nuxt', 'nuxt-swiper', "@dargmuesli/nuxt-cookie-control"],
  pinia: {
    storesDirs: ['./stores/**', './stores'],
  },
  imports: {
    autoImport: true,
    dirs: ['./stores/**']
  },
  runtimeConfig: {
    public: {
      apiBase:'http://localhost:3001/api'
    }
  },
  ssr:true
})