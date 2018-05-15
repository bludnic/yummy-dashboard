require('dotenv/config')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Yummy dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    'mdi/css/materialdesignicons.min.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/axios.js'],
  /*
   * Nuxt modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   * Env
   */
  env: {
    baseURL: process.env.BASE_URL,
    apiURL: process.env.BASE_URL + '/api'
  }
}
