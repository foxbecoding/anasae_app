import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { VApp } from 'vuetify/components/VApp'
import { VBtn } from 'vuetify/components/VBtn'
import { VMain } from 'vuetify/components/VMain'

export default defineNuxtPlugin(nuxtApp => {
    const anasaeDark = {
        dark: true,
        colors: {
            background: 'rgb(18,18,18)',
            surface: 'rgb(36,36,36)',
            'surface-alt': 'rgb(240,240,240)',
            primary: '#3fabf3',
            error: '#EF5350',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
        }
    } 
    const anasaeLight = {
        dark: false,
        colors: {
            background: 'rgb(255,255,255)',
            surface: 'rgb(220,220,220)',
            'surface-alt': 'rgb(15,15,15)',
            primary: '#3fabf3',
            error: '#EF5350',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
        }
    } 
    const vuetify = createVuetify({
        ssr: true,
        components: { VApp, VBtn, VMain },
        directives,
        aliases: {
            NanaBtn: VBtn,
        },
        
        defaults: {
            NanaBtn: {
                class: ['v-btn--primary', 'text-none'],
            },
        },
        theme: {
            defaultTheme: 'anasaeDark',
            themes: {
                anasaeDark, anasaeLight
            }
        }
    })
    nuxtApp.vueApp.use(vuetify)
})