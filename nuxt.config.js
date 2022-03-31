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
            {rel: 'icon', type: 'image/x-icon', href: '/templates/favicoT2.ico'}
        ],
        script: [
            // {type: "text/javascript", src: "/log.js"}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        `@/static/styles.css`,
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/google-fonts',
        '@nuxt/postcss8',

    ],


    googleFonts: {
        families: {
            Ubuntu: [300]
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],


    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    serverMiddleware: [
        "~/api/metrics",
        "~/api/tags",
        "~/api/populars",
        "~/api/series",
        "~/api/calc",
        "~/api/tagCalc",

    ],



}
