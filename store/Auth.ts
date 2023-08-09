export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('index')
    const isAuth = ref<boolean>(false)
    const loginForm = reactive({
        email: '',
        username: '',
        password: '',
        isUsername: false
    })
    
    return {
        isAuth,
        loginForm,
        prevRoute
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}