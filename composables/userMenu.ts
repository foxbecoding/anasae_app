import { useUserStore } from '@/store'
import { useTheme } from 'vuetify'

const isLightTheme = ref<boolean>(false)
export const useUserMenu = () => {
    interface MenuItem {
        id: number
        prependIcon: string
        appendIcon?: string
        text: string
        to?: string
        action?: Function
    }

    const theme = useTheme()
    const userStore = useUserStore()
    const isOpen = ref<boolean>(false)

    const toggleTheme = (): void => {
        theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
    }
    
    const ThemeIcon = computed((): string => theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny')
    
    const CurrentTheme = computed((): string => theme.global.current.value.dark ? 'Dark' : 'Light')
    const ListBgColor = computed((): string => theme.global.current.value.dark ? 'surface' : 'background')
    

    const homeAccountItems = ref<MenuItem[]>([
        { id: 1, prependIcon: 'mdi-account-circle-outline', text: 'Your profile', to: `/profile/${userStore.user.uid}`},
        { id: 2, prependIcon: 'mdi-storefront-outline', text: 'Your brands'},
        { id: 3, prependIcon: 'mdi-storefront-plus-outline', text: 'Create a brand'},
        { id: 4, prependIcon: 'mdi-logout-variant', text: 'Sign out'}
    ])

    const homeSiteConfigItems = ref<MenuItem[]>([
        { 
            id: 1, 
            prependIcon: `${ThemeIcon.value}`, 
            appendIcon: 'mdi-chevron-right',
            text: `Theme: ${CurrentTheme.value}`
        },
    ])

    const themeItems = ref<MenuItem[]>([
        { 
            id: 1, 
            prependIcon: 'mdi-weather-night', 
            appendIcon: 'mdi-check',
            text: 'Dark theme'
        },
        { 
            id: 2, 
            prependIcon: 'mdi-weather-sunny', 
            appendIcon: 'mdi-check',
            text: 'Light theme'
        },
    ])

    watch(isLightTheme, (newValue) => {
        if(newValue){
            theme.global.name.value = 'anasaeLight'
            return
        }
        theme.global.name.value = 'anasaeDark'
    })

    return {
        homeAccountItems,
        homeSiteConfigItems,
        isOpen,
        isLightTheme,
        ListBgColor,
        themeItems
    }

}