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
    
    const THEME_ICON = computed((): string => theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')
    
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
            prependIcon: `${THEME_ICON.value}`, 
            appendIcon: 'mdi-chevron-right',
            text: 'Your brands'
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
        ListBgColor
    }

}