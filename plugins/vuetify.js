import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { VApp } from 'vuetify/components/VApp'
import { VAppBar } from 'vuetify/components/VAppBar'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardActions, VCardItem, VCardText, VCardTitle, VCardSubtitle } from 'vuetify/components/VCard'
import { VCol, VContainer, VGrid, VRow, VSpacer  } from 'vuetify/components/VGrid'
import { VMain } from 'vuetify/components/VMain'

export default defineNuxtPlugin(nuxtApp => {
    const anasaeDark = {
        dark: true,
        colors: {
            background: 'rgb(18,18,18)',
            surface: 'rgb(36,36,36)',
            'surface-alt': 'rgb(241,241,241)',
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
        components: { 
            VApp, 
            VAppBar, 
            VBtn, 
            VCard,
            VCardActions,
            VCardItem, 
            VCardText, 
            VCardTitle, 
            VCardSubtitle,
            VCol, 
            VContainer, 
            VGrid, 
            VMain,
            VRow, 
            VSpacer,
        },
        directives,
        aliases: {
            NanaBtn: VBtn,
        },
        
        defaults: {
            VAppBar: {
                color: 'background',
                fixed: true,
                flat: true,
                floating: true
            },
            VBtn: { variant: 'flat' },
            VCard: { flat: true },
            NanaBtn: {
                variant: 'flat',
                class: ['v-btn--primary'],
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