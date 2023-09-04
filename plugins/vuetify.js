import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { VOtpInput } from 'vuetify/labs/VOtpInput'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { VApp } from 'vuetify/components/VApp'
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import { VAlert } from 'vuetify/components/VAlert'
import { VAvatar } from 'vuetify/components/VAvatar'
import { VBottomNavigation } from 'vuetify/components/VBottomNavigation'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardActions, VCardItem, VCardText, VCardTitle, VCardSubtitle } from 'vuetify/components/VCard'
import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel'
import { VCol, VContainer, VRow, VSpacer  } from 'vuetify/components/VGrid'
import { VDialog } from 'vuetify/components/VDialog'
import { VDivider } from 'vuetify/components/VDivider'
import { VFileInput } from 'vuetify/components/VFileInput'
import { VForm } from 'vuetify/components/VForm'
import { VIcon } from 'vuetify/components/VIcon'
import { VImg } from 'vuetify/components/VImg'
import { VList, VListItem, VListItemTitle, VListItemSubtitle } from 'vuetify/components/VList'
import { VMain } from 'vuetify/components/VMain'
import { VMenu } from 'vuetify/components/VMenu'
import { VOverlay } from 'vuetify/components/VOverlay'
import { VSheet } from 'vuetify/components/VSheet'
import { VTextarea } from 'vuetify/components/VTextarea'
import { VTextField } from 'vuetify/components/VTextField'
import { VSelect } from 'vuetify/components/VSelect'
import { VSnackbar } from 'vuetify/components/VSnackbar'
import { VSwitch } from 'vuetify/components/VSwitch'
import { VToolbar, VToolbarItems, VToolbarTitle } from 'vuetify/components/VToolbar'
import { VWindow, VWindowItem } from 'vuetify/components/VWindow'

export default defineNuxtPlugin(nuxtApp => {
    const anasaeDark = {
        dark: true,
        colors: {
            background: 'rgb(18,18,18)',
            'glass-bg': 'rgb(255,255,255)',
            surface: 'rgb(36,36,36)',
            'surface-alt': 'rgb(241,241,241)',
            'surface-el': 'rgb(36,36,36)',
            'slider': 'rgb(18,18,18)',
            primary: 'rgb(241,241,241)',
            'primary-alt': '#42A5F5',
            error: '#F44336',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            'stripe-form-field-flat': 'rgb(48,48,48)',
            'form-field-flat': 'rgb(48,48,48)'
        }
    } 
    const anasaeLight = {
        dark: false,
        colors: {
            background: 'rgb(255,255,255)',
            'glass-bg': 'rgb(0,0,0)',
            surface: 'rgb(255,255,255)',
            'surface-alt': 'rgb(15,15,15)',
            'surface-el': 'rgb(220,220,220)',
            'slider': 'rgb(255,255,255)',
            primary: 'rgb(15,15,15)',
            'primary-alt': '#1E88E5',
            error: '#B71C1C',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            'stripe-form-field-flat': 'rgb(208,208,208)',
            'form-field-flat': 'rgb(208,208,208)'
        }
    } 
    const vuetify = createVuetify({
        ssr: true,
        components: { 
            VApp, 
            VAppBar, 
            VAppBarTitle,
            VAlert, 
            VAvatar,
            VBottomNavigation,
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
            VDivider,
            VFileInput,
            VForm,
            VIcon,
            VImg,
            VList,
            VListItem,
            VListItemTitle,
            VListItemSubtitle,
            VMain,
            VMenu,
            VOtpInput,
            VOverlay,
            VRow, 
            VSelect,
            VSheet,
            VSkeletonLoader,
            VSnackbar,
            VSpacer,
            VSwitch,
            VTextarea,
            VTextField,
            VToolbar, 
            VToolbarItems, 
            VToolbarTitle,
            VWindow,
            VWindowItem
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