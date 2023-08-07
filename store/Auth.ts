export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('index')
    const isAuth = ref<boolean>(false)
    
    return {
        prevRoute,
        isAuth
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}