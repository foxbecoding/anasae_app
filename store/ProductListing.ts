import { ProductListingPage } from '@/utils/types'

export const useProductListingPageStore = defineStore("product-listing-page-store", () => {
    const listing = ref<ProductListingPage>({} as ProductListingPage)
    const listingPk = ref()
    const currentVariant = reactive({
        variant_id: '',
        color: '',
        size: '',
        qty: 0
    })


    return {
        listing,
        listingPk,
        currentVariant
    }
})





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductListingPageStore, import.meta.hot));
}