export const useUserStore = defineStore("user-store", () => {
    const is_authenticated = ref<boolean>(false)

    return {
        is_authenticated
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}