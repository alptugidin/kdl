export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KDramaLike - Search and find your favorite Koran Dramas',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'kdramalike.com find and list korean dramas similar to your favourite.'
      },
      {name: 'format-detection', content: 'telephone=no'},
      {
        name: 'keywords',
        content: 'kdramalike, kdramas like, korean dramas like, kdramas to similar, korean dramas  to similar'
      },

    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/assets/favicoT2.ico'}
    ],
    script:[
      {type: "text/javascript", src: "/scripts/metric.js"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    `@/static/styles.css`,
    `@/node_modules/bulma-modal-fx/dist/css/modal-fx.min.css`
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: `@/node_modules/bulma-modal-fx/dist/js/modal-fx.min.js`, mode: `client`}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    // '@nuxtjs/fontawesome'
  ],

  // fontawesome: {
  //   icons: {
  //     solid: true,
  //     brands: true
  //   }
  // },

  googleFonts: {
    families: {
      Ubuntu: [300]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', {materialDesignIcons: false}],
    // '@nuxtjs/proxy'
  ],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  },

  serverMiddleware: [
    // "~/api",
    "~/api/metrics",
    "~/api/tags",
    "~/api/populars",
    "~/api/series",
    "~/api/calc",
    "~/api/tagCalc"
  ],

  // axios: {
  //   baseURL: "https://kdramalike.com/api",
  //   proxyHeaders: false,
  //   credentials: false
  // },
  //

  hooks: {
    'vue-renderer:ssr:context'(context) {
      const routePath = JSON.stringify(context.nuxt.routePath);
      context.nuxt = {serverRendered: true, routePath};
    }
  },

  //
  // server:{
  //   host : '192.168.1.24'
  // }
  //



}
