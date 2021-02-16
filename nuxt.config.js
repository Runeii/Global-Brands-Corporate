module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Global Brands',
    titleTemplate: '%s - Global Brands',
    meta: [
      { charset: 'utf-8' },
      { "http-equiv": 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Global Brands is an independent drinks company founded in 1997 by entrepreneur Steve Perez. We have an extensive portfolio of brands for every occasion.' },
      { name: 'application-name', content: 'Global Brands' },
      { vmid: 'twitter:title', property: 'twitter:title', content: 'Global Brands' },
      { vmid: 'og:description', property: 'og:description', content: 'Global Brands is an independent drinks company founded in 1997 by entrepreneur Steve Perez. We have an extensive portfolio of brands for every occasion.' },
      { vmid: 'twitter:description', property: 'twitter:description', content: 'Global Brands is an independent drinks company founded in 1997 by entrepreneur Steve Perez. We have an extensive portfolio of brands for every occasion.' },
      { vmid: 'og:title', property: 'og:title', content: 'Global Brands' },
      { vmid: 'og:image', property: 'og:image', content: '/favicons/mstile-310x310.png' },
      { vmid: 'og:image:width', property: 'og:image:width', content: '310' },
      { vmid: 'og:image:height', property: 'og:image:height', content: '310' },
      { vmid: 'twitter:image', property: 'twitter:image', content: '/favicons/mstile-310x310.png' },
      { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:type', content: 'website' },
      { name: 'msapplication-TileColor', content: '#FFFFFF'},
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'msapplication-square70x70logo', content: '/favicons/mstile-70x70.png' },
      { name: 'msapplication-square150x150logo', content: '/favicons/mstile-150x150.png' },
      { name: 'msapplication-wide310x150logo', content: '/favicons/kmstile-310x150.png' },
      { name: 'msapplication-square310x310logo', content: '/favicons/mstile-310x310.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: '/favicons/apple-touch-icon-57x57.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '114x114', href: '/favicons/apple-touch-icon-114x114.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '72x72', href: '/favicons/apple-touch-icon-72x72.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '144x144', href: '/favicons/apple-touch-icon-144x144.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '60x60', href: '/favicons/apple-touch-icon-60x60.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '120x120', href: '/favicons/apple-touch-icon-120x120.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '76x76', href: '/favicons/apple-touch-icon-76x76.png'},
      { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/favicons/apple-touch-icon-152x152.png'},
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-196x196.png', sizes: '196x196' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-128.png', sizes: '128x128' }

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
  loading: {
    color: 'white',
    height: '5px'
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    afterEnter(el) {
      if(this.$store.state.scrolltarget) {
        el.querySelector(this.$store.state.scrolltarget).scrollIntoView({behavior: "smooth", block: 'start'})
        this.$store.commit('deleteScrollTarget')
      }
    }
  },
  build: {
    analyze: true,
    vendor: [
      'axios',
      'date-fns',
      '~/static/js/picturefill.js',
      '~/static/js/modernizr.js'
    ],
    babel: {
      presets({ envName }, [ preset, options ]) {
        const envTargets = {
          client: { browsers: ["last 2 versions"], ie: 11 },
          server: { node: "current" },
        }
        return [
          [
            "@nuxt/babel-preset-app",
            {
              corejs: { version: 3 },
              targets: envTargets[envName]
            }
          ]
        ]
      }
    },
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
    scrollBehavior: function (to, from, savedPosition) {
      if (to.hash && to.path === from.path) {
        $nuxt.$el.querySelector(to.hash).scrollIntoView({behavior: "smooth", block: 'start'})
      } else if (to.hash) {
        $nuxt.$store.state.scrolltarget = to.hash
        return { x: 0, y: 0 }
      } else if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  }
}
