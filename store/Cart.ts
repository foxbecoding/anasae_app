import { ApiData, Cart } from '@/utils/types'

export const useCartStore = defineStore("cart-store", () => {
    const cartId = ref<string|number>('')
    const cart = ref<Cart[]>([])

    const init = async (): Promise<void>  => {
        const config = useRuntimeConfig()
        let apiData: ApiData = {
            method: 'GET',
            path: `${config.public.API_CART}`
        }
        const { data, error } = await useApi(apiData)
        if(data.value == null) return
        cartId.value = data.value.pk
        cart.value = [...data.value.items]
    }

    return {
        cart,
        cartId,
        init
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}