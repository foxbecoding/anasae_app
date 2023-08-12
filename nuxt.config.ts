// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: false },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            CDN_URL: process.env.CDN_URL,
            CDN_MEDIA_URL: process.env.CDN_MEDIA_URL,
            API_BASE_URL: process.env.API_BASE_URL,
            API_AUTH_LOGIN: process.env.API_AUTH_LOGIN,
            API_AUTH_LOGOUT: process.env.API_AUTH_LOGOUT,
            API_AUTH_VALIDATE: process.env.API_AUTH_VALIDATE,
            API_AUTH_VALIDATE_DETAILS: process.env.API_AUTH_VALIDATE_DETAILS,
            API_AUTH_VALIDATE_PASSWORD: process.env.API_AUTH_VALIDATE_PASSWORD,
            API_AUTH_VERIFY_EMAIL: process.env.API_AUTH_VERIFY_EMAIL,
            API_SLIDER: process.env.API_SLIDER,
            API_USER_GENDER: process.env.API_USER_GENDER,
            API_X_FCT: process.env.API_X_FCT
            
        }
    },
    app: {
        head: { 
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }, 
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]   
        }
    },
    css: [
        'vuetify/lib/styles/main.sass', 
        '@mdi/font/css/materialdesignicons.min.css',
        'assets/styles.scss'
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        }
    },
    
    modules: [
        'nuxt-vitest',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore',
                    'acceptHMRUpdate',
                ],
            },
        ]
    ]
})
