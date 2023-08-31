import { useUserStore, useSnackbarStore, useBrandStore } from '@/store'
import { User, Brand } from '@/utils/types'
import { RouteRecordName } from 'vue-router'

export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('/')
    const prevRouteName = ref<RouteRecordName | null | undefined>('index')
    const isAuth = ref<boolean>(false)
    const loginForm = reactive({
        email: '',
        username: '',
        password: '',
        isUsername: false
    })

    const signUpCompleted = ref<boolean>(false)

    const signUpForm = reactive({
        email: '',
        username: '',
        first_name: '',    
        last_name: '',
        birth_month: null,    
        birth_day: null,    
        birth_year: null,
        otp_code: '',
        password: '', 
        gender: null,   
        confirm_password: ''    
    })

    const signUpFormStep = ref<number>(1)
    const signUpFormGenderOptions = ref<{id: string | number, title: string, value: string | number}[]>([])
    
    const setPrevRouteData = (routePath: string, routeName: RouteRecordName | null | undefined) => {
        prevRoute.value = routePath
        prevRouteName.value = routeName
    } 

    const signOut = async (): Promise<void> => {
        const config = useRuntimeConfig()
        await useApi({
            path: `${config.public.API_AUTH_LOGOUT}`,
            method: 'POST'
        })
        navigateTo('/', {replace: true})
        isAuth.value = false
        useUserStore().user = {} as User
        useBrandStore().brands = [] 
        useSnackbarStore().setSnackbar('Signed out', true)
    }

    return {
        isAuth,
        loginForm,
        prevRoute,
        prevRouteName,
        signUpForm,
        signUpFormStep,
        signUpFormGenderOptions,
        signUpCompleted,
        setPrevRouteData,
        signOut
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}