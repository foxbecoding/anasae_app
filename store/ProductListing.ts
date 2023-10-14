export const useProductListingPageStore = defineStore("product-listing-page-store", () => {
    const listing = ref<any>()
    const currentVariant = reactive({
        variant_id: '',
        color: '',
        size: ''
    })
    const prevRoute = ref('')
    const IsPrevRouteAuth = computed(() => {
        let routes = ['auth-login', 'auth-sign-up', 'auth-forgot-password']
         return routes.includes(prevRoute.value)
    })

    return {
        listing,
        currentVariant,
        prevRoute,
        IsPrevRouteAuth
    }
})





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductListingPageStore, import.meta.hot));
}