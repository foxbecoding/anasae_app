import { Brand } from '@/utils/types'
import { useAuthStore, useUserStore } from '@/store'

export const useBrandStore = defineStore("brand-store", () => {
    const brands = ref<Brand[]>([])

    const middleware = () => {
        if(!useAuthStore().isAuth){ navigateTo('/') }
        if(useAuthStore().isAuth && useUserStore().user.owned_brands.length === 0){ navigateTo('/add-your-brand') }
    }
    return {
        brands,
        middleware
    }
})

export const useBrandCenterStore = defineStore("brand-center-store", () => {
    const addProductsForm = reactive({
        title: '',
        description: '',
        category: null,
        quantity: 0,
        sku: '',
        isbn: ''
    })

    return {
        addProductsForm
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot));
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterStore, import.meta.hot));
}