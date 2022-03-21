module.exports = {
    mode: "jit",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        container: {
            // center: true
        },
        screens: {
            'm': {'max': '767px'},
            't': {'min': '768px', 'max': '1023px'},
            'd': {'min': '1024px'},
            // 't': {'min': '768px', 'max': '1023px'},

            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',


        },
        extend: {
            width: {
                "432px": "432px",

            },
            height: {
                "36px": "36px",
                "74px": "74px",
                "5px": "5px"
            }
        },
        colors: {
            "db": "#dbdbdb",
            "ef": "#efefef"

        }
    },
    plugins: [],
}