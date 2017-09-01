module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Global Brands',
    meta: [
      { charset: 'utf-8' },
      { "http-equiv": 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/scripts.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  /*
  ** Build configuration
  */
  loading: '~/components/loading.vue',
  build: {
    analyze: true,
    vendor: [
      'axios',
      'date-fns',
      '~/static/js/picturefill.js',
      '~/static/js/modernizr.js'
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    { src: '~/assets/scss/screen.scss', lang: 'scss' }
  ],
  router: {
    middleware: 'anchorScrolling',
    scrollBehavior: function (to, from, savedPosition) {
      if (to.hash && to.path === from.path) {
        to.matched[0].instances.default.$el.querySelector(to.hash).scrollIntoView({behavior: "smooth", block: 'start'});
      }
    }
  }
}
