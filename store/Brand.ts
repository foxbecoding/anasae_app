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





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot));
}