// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts'],
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Noto+Sans+Lao+Looped': true,
      'Noto+Sans+Lao': true,
      Lato: [200, 300],
      Raleway: {
        wght: [300, 400],
        ital: [100]
      },
    },
    display: 'swap'
  }
})
