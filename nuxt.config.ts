// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  runtimeConfig: {
    apiUrl: process.env.API_URL,
  },
  modules: ['@pinia/nuxt'],
});
