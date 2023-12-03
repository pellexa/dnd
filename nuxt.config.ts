// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  runtimeConfig: {
    apiUrl: 'https://rickandmortyapi.com/api',
  },
  modules: ['@pinia/nuxt'],
});
