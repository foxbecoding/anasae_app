export const useProductListingStore = defineStore("product-listing-store", () => {
    const listing = ref<any>()

    return {
        listing
    }
})





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductListingStore, import.meta.hot));
}