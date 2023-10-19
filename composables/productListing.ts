import { ProductListingPageProduct } from '@/utils/types'
import {  useAuthStore, useCartStore, useProductListingPageStore, useSnackbarStore } from '@/store'

export const useProductListingPage = () => {
    const config = useRuntimeConfig()
    const store = useProductListingPageStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
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

    const ProductVariant = computed((): ProductListingPageProduct => {
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

    const SelectedProductVariantImage = computed(() => ProductVariant.value.images[0])
    const SelectedProductVariantColor = computed(() => ProductVariant.value.specifications.find((x: any) => x.label == 'Color')?.value.toUpperCase())
    const SelectedProductVariantSize = computed(() => ProductVariant.value.specifications.find((x: any) => x.label == 'Size')?.value.toUpperCase())
    const SelectedProductVariantPrice = computed(() => ProductVariant.value.price/100 )

    const qtyHandler = (type: '+'|'-'): void => {
        if(type == '+' && qty.value < ProductVariant.value.quantity){
            qty.value++
        }else if(type == '-' && qty.value != 0){
            qty.value--
        }
        store.currentVariant.qty = qty.value
    }

    const addToCart = async (): Promise<void> => {
        if(!authStore.isAuth) {
            authStore.setPrevRouteData(route.fullPath, route.name)
            navigateTo({name: 'auth-login'})
            return 
        }
        const requestData = {cart: cartStore.cartId, item: ProductVariant.value.pk, quantity: qty.value}
        const {data, error, status} = await useApi({
            method: 'POST',
            path: `${config.public.API_CART_ITEM}`,
            data: requestData
        })
        if(status.value != 'error'){
            cartStore.cart = [...data.value.items]
            useSnackbarStore().setSnackbar(
                'Added to cart', 
                true, 
                `${config.public.CDN_URL+ProductVariant.value.images[0]}`
            )
        }else{
            useSnackbarStore().setSnackbar(
                'Error please try again', 
                true, 
                ``,
                'error'
            )
        }
        
    }

    return {
        qty,
        ProductVariant,
        IsAuthRoute,
        SelectedProductVariantImage,
        SelectedProductVariantColor,
        SelectedProductVariantSize,
        SelectedProductVariantPrice,
        addToCart,
        qtyHandler
    }
}