import { useProductListingPageStore } from '@/store'

export const useProductListingPage = () => {
    const store = useProductListingPageStore()
    const route = useRoute()
    const qty = ref(0)
    
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
        var variant: any 
        if(!IsAuthRoute.value){
            variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
            if(store.listing.pk == store.listingPk){
                qty.value = qty.value > variant.quantity ? variant.quantity : store.currentVariant.qty
            }else{
                store.listingPk = store.listing.pk 
            }
        }else{
            variant = store.listing.products.find((x:any) => x.uid == store.currentVariant.variant_id)
            qty.value = store.currentVariant.qty
        }
        if(variant.qty == 0) qty.value = 0
        return variant
    })

    const qtyHandler = (type: '+'|'-'): void => {
        if(type == '+' && qty.value < ProductVariant.value.quantity){
            qty.value++
        }else if(type == '-' && qty.value != 0){
            qty.value--
        }
        store.currentVariant.qty = qty.value
    }

    return {
        qty,
        ProductVariant,
        IsAuthRoute,
        qtyHandler
    }
}