// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    "@pinia/nuxt",
  ],
  elementPlus: {},
  devtools: { enabled: false },
  css: [`~/assets/styles/main.scss`],
  devServer: {
    port: 9000
  }
})
