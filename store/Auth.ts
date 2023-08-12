import { FormSelectField } from '@/utils/types'

export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('index')
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
        gender: '',   
        confirm_password: ''    
    })

    const signUpFormStep = ref<number>(1)

    const signUpFormGenderOptions = ref<{id: string | number, title: string, value: string | number}[]>([])
    
    return {
        isAuth,
        loginForm,
        prevRoute,
        signUpForm,
        signUpFormStep,
        signUpFormGenderOptions,
        signUpCompleted
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}