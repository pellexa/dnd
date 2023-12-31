// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  runtimeConfig: {
    public: {
      apiUrl: 'https://rickandmortyapi.com/api',
    },
  },
  modules: ['@pinia/nuxt'],
  ssr: false,
});
