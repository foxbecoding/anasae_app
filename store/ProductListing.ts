export const useProductListingPageStore = defineStore("product-listing-page-store", () => {
    const listing = ref<any>()
    const currentVariant = reactive({
        variant_id: '',
        color: '',
        size: ''
    })


    return {
        listing,
        currentVariant
    }
})





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductListingPageStore, import.meta.hot));
}