// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: false },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            CDN_URL: process.env.CDN_URL,
            CDN_MEDIA_URL: process.env.CDN_MEDIA_URL,
            CDN_MEDIA_ASSETS_PATH: process.env.CDN_MEDIA_ASSETS_PATH,
            COMPANY_NAME: process.env.COMPANY_NAME,
            API_BASE_URL: process.env.API_BASE_URL,
            API_AUTH_FORGOT_PASSWORD: process.env.API_AUTH_FORGOT_PASSWORD,
            API_AUTH_LOGIN: process.env.API_AUTH_LOGIN,
            API_AUTH_LOGOUT: process.env.API_AUTH_LOGOUT,
            API_AUTH_VALIDATE: process.env.API_AUTH_VALIDATE,
            API_AUTH_VALIDATE_DETAILS: process.env.API_AUTH_VALIDATE_DETAILS,
            API_AUTH_VALIDATE_PASSWORD: process.env.API_AUTH_VALIDATE_PASSWORD,
            API_AUTH_VERIFY_EMAIL: process.env.API_AUTH_VERIFY_EMAIL,
            API_BRAND: process.env.API_BRAND,
            API_BRAND_FOLLOWERS: process.env.API_BRAND_FOLLOWERS,
            API_BRAND_LOGO: process.env.API_BRAND_LOGO,
            API_BRAND_OWNER: process.env.API_BRAND_OWNER,
            API_BRAND_PAGE: process.env.API_BRAND_PAGE,
            API_CATEGORY: process.env.API_CATEGORY,
            API_CATEGORY_PRODUCT_SPECIFICATIONS: process.env.API_CATEGORY_PRODUCT_SPECIFICATIONS,
            API_PRODUCT: process.env.API_PRODUCT,
            API_PRODUCT_IMAGE: process.env.API_PRODUCT_IMAGE,
            API_PRODUCT_PRICE: process.env.API_PRODUCT_PRICE,
            API_PRODUCT_SPECIFICATION: process.env.API_PRODUCT_SPECIFICATION,
            API_SLIDER: process.env.API_SLIDER,
            API_USER: process.env.API_USER,
            API_USER_ADDRESSES: process.env.API_USER_ADDRESSES,
            API_USER_BILLING_ADDRESSES: process.env.API_USER_BILLING_ADDRESSES,
            API_USER_FOLLOWERS: process.env.API_USER_FOLLOWERS,
            API_USER_GENDER: process.env.API_USER_GENDER,
            API_USER_IMAGE: process.env.API_USER_IMAGE,
            API_USER_PAYMENT_METHODS: process.env.API_USER_PAYMENT_METHODS,
            API_USER_PROFILE: process.env.API_USER_PROFILE,
            API_X_FCT: process.env.API_X_FCT,
            SITE_DOMAIN: process.env.SITE_DOMAIN,
            STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
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
