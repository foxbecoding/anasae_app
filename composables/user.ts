import { useUserStore } from '@/store'
import { useTheme } from 'vuetify'
import { UserMenuHome, UserMenuTheme } from '@/components/User/Menu/components'

type ViewType = typeof UserMenuHome | typeof UserMenuTheme
const isLightTheme = ref<boolean>(false)
const selectedView = shallowRef<ViewType>(UserMenuHome)
const isOpen = ref<boolean>(false)

export const useUserMenu = () => {
    interface MenuItem {
        id: number
        prependIcon: string
        appendIcon?: string
        text: string
        to?: string
        action?: Function
        custom?: any
    }

    const theme = useTheme()
    const userStore = useUserStore()
    const CurrentTheme = computed((): string => theme.global.current.value.dark ? 'Dark' : 'Light')
    const BackgroundColor = computed((): string => theme.global.current.value.dark ? 'surface' : 'background')

    const homeAccountItems = ref<MenuItem[]>([
        { 
            id: 1, 
            prependIcon: 'mdi-account-circle-outline', 
            text: 'Your profile', 
            to: `/profile/${userStore.user.uid}`,
            action: () => { isOpen.value = false }
        },
        { id: 2, prependIcon: 'mdi-storefront-outline', text: 'Your brands'},
        { id: 3, prependIcon: 'mdi-storefront-plus-outline', text: 'Create a brand'},
        { id: 4, prependIcon: 'mdi-logout-variant', text: 'Sign out'}
    ])

    const homeSiteConfigItems = ref<MenuItem[]>([
        { 
            id: 1, 
            prependIcon: 'mdi-theme-light-dark', 
            appendIcon: 'mdi-chevron-right',
            text: `Theme: ${CurrentTheme.value}`, 
            action: function() {
                selectedView.value = UserMenuTheme
            }
        },
    ])

    const themeItems = ref<MenuItem[]>([
        { 
            id: 1, 
            prependIcon: 'mdi-weather-night',
            text: 'Dark theme',
            action: () => { isLightTheme.value = false }
        },
        { 
            id: 2, 
            prependIcon: 'mdi-weather-sunny', 
            text: 'Light theme',
            action: () => { isLightTheme.value = true }
        },
    ])

    const goBack = (): void => { selectedView.value = UserMenuHome }

    const updateMenu = (e: boolean): void => { if (e) goBack() }

    watch(isLightTheme, (newValue) => {
        if(newValue){
            theme.global.name.value = 'anasaeLight'
            return
        }
        theme.global.name.value = 'anasaeDark'
    })

    return {
        updateMenu,
        goBack,
        homeAccountItems,
        homeSiteConfigItems,
        isLightTheme,
        isOpen,
        BackgroundColor,
        themeItems,
        selectedView
    }
}