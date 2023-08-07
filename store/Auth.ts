export const useAuthStore = defineStore("auth-store", () => {
    const prevRoute = ref<string>('index')

    return {
        prevRoute
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}