// https://nuxt.com/docs/api/configuration/nuxt-config
import { vuetifyTags } from './vue.compiler.options'
export default defineNuxtConfig({
    devtools: { enabled: false },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            CDN_URL: process.env.CDN_URL,
            CDN_MEDIA_URL: process.env.CDN_MEDIA_URL,
            API_BASE_URL: process.env.API_BASE_URL,
            API_SLIDER: process.env.API_SLIDER
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
    // vue: { compilerOptions: {
    //         isCustomElement: (tag) => vuetifyTags.includes(tag),
    //     },
    // },

    
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
