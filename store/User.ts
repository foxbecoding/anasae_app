import { User, UserAddress, ApiData } from '@/utils/types'
import { useAuthStore, useBrandStore } from './'
import { UserMenuHome } from '@/components/User/Menu/components'


export const useUserStore = defineStore("user-store", () => {
    const user = ref<User>({} as User)

    const init = async (): Promise<void>  => {
        const config = useRuntimeConfig()
        let apiData: ApiData = {
            method: 'GET',
            path: `${config.public.API_USER}`
        }
        const { data, error } = await useApi(apiData)
        if(data.value == null) return
        useAuthStore().isAuth = data.value.status
        user.value = data.value.user
    }

    return {
        user,
        init
    }
})

export const useUserMenuStore = defineStore("user-menu-store", () => {
    const compType = () => UserMenuHome
    type ViewType = ReturnType<typeof compType> 
    
    const isLightTheme = ref<boolean>(false)
    const selectedView = shallowRef<ViewType>()
    const walletPreviousView = shallowRef<ViewType>()
    const walletSelectedPaymentMethod = ref()
    const isOpen = ref<boolean>(false)
    const selectedAddress = ref<UserAddress>()
    
    const goBack = (): void => { selectedView.value = UserMenuHome }
    const updateMenu = (e: boolean): void => { if (e) goBack() }
    const close = () => {
        isOpen.value = false
        goBack()
    }
    
    const CurrentView = computed((): ViewType => {
        if (!selectedView.value) return UserMenuHome
        return selectedView.value
    })
    
    return {
        CurrentView,
        isLightTheme,
        isOpen,
        selectedAddress,
        selectedView,
        walletPreviousView,
        walletSelectedPaymentMethod,
        close,
        goBack,
        updateMenu,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
    import.meta.hot.accept(acceptHMRUpdate(useUserMenuStore, import.meta.hot));
}