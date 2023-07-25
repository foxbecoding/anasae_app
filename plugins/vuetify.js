import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { VApp } from 'vuetify/components/VApp'
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardActions, VCardItem, VCardText, VCardTitle, VCardSubtitle } from 'vuetify/components/VCard'
import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel'
import { VCol, VContainer, VRow, VSpacer  } from 'vuetify/components/VGrid'
import { VDialog } from 'vuetify/components/VDialog'
import { VForm } from 'vuetify/components/VForm'
import { VIcon } from 'vuetify/components/VIcon'
import { VImg } from 'vuetify/components/VImg'
import { VMain } from 'vuetify/components/VMain'
import { VSheet } from 'vuetify/components/VSheet'
import { VTextField } from 'vuetify/components/VTextField'
import { VToolbar, VToolbarItems, VToolbarTitle } from 'vuetify/components/VToolbar'

export default defineNuxtPlugin(nuxtApp => {
    const anasaeDark = {
        dark: true,
        colors: {
            background: 'rgb(18,18,18)',
            surface: 'rgb(36,36,36)',
            'surface-alt': 'rgb(241,241,241)',
            'slider': 'rgb(0,0,0)',
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
            'slider': 'rgb(255,255,255)',
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
            VAppBarTitle, 
            VBtn, 
            VCard,
            VCardActions,
            VCardItem, 
            VCardText, 
            VCardTitle, 
            VCardSubtitle,
            VCarousel,
            VCarouselItem,
            VCol, 
            VContainer, 
            VDialog,
            VForm,
            VIcon,
            VImg,
            VMain,
            VRow, 
            VSheet,
            VSpacer,
            VTextField,
            VToolbar, 
            VToolbarItems, 
            VToolbarTitle
        },
        directives,
        aliases: {
            NanaBtn: VBtn,
            NanaBtnOutlined: VBtn,
            NanaAppBarBtn: VBtn,
            NanaSliderNavBtn: VBtn
        },
        
        defaults: {
            VAppBar: {
                color: 'background',
                fixed: true,
                flat: true,
                floating: true
            },
            VBtn: { 
                variant: 'flat' 
            },
            VCard: { flat: true },
            NanaAppBarBtn: {
                variant: 'flat',
                class: ['surface-bg'],
            },
            NanaSliderNavBtn: {
                variant: 'flat',
                class: ['surface-bg', 'rounded-xl'],
            },
            NanaBtn: {
                variant: 'flat',
                class: ['nana-primary-color'],
            },
            NanaBtnOutlined: {
                variant: 'flat',
                class: ['bg-background']
            }
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