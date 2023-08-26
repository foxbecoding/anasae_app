import { Brand, BrandOwner } from '@/utils/types'
import { useAuthStore } from './'


export const useBrandStore = defineStore("brand-store", () => {
    const brands = ref<Brand[]>([])


    return {
        brands
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot));
}