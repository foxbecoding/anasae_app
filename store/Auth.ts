export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('index')
    const isAuth = ref<boolean>(false)
    const loginForm = reactive({
        email: '',
        username: '',
        password: '',
        isUsername: false
    })

    const signUpForm = reactive({
        email: '',
        username: '',
        first_name: '',    
        last_name: '',
        birth_month: '',    
        birth_day: '',    
        birth_year: '',
        otp_code: '',
        password: '',    
        confirm_password: ''    
    })

    const signUpFormStep = ref<number>(1)
    
    return {
        isAuth,
        loginForm,
        prevRoute,
        signUpForm,
        signUpFormStep
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}