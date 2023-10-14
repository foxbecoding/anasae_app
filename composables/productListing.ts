import { useProductListingPageStore } from '@/store'

export const useProductListingPage = () => {
    const store = useProductListingPageStore()
    const route = useRoute()
    
    const IsAuthRoute = computed((): boolean => {
        var routeName = route.name
        if(routeName == 'auth-login' 
        || routeName == 'auth-sign-up' 
        || routeName == 'auth-forgot-password') 
        {
            return true
        }else{
            return false
        }
    })

    const ProductVariant = computed(() => {
        if(!IsAuthRoute.value){
            return route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
        }else{
            return store.listing.products.find((x:any) => x.uid == store.currentVariant.variant_id)
        }
    })

    return {
        ProductVariant,
        IsAuthRoute
    }
}