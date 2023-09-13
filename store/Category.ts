import { Category, ApiData } from '@/utils/types'


export const useCategoryStore = defineStore("category-store", () => {
    const categories = ref<Category[]>([])

    const init = async (): Promise<void>  => {
        const config = useRuntimeConfig()
        let apiData: ApiData = {
            method: 'GET',
            path: `${config.public.API_CATEGORY}`
        }
        const { data, error } = await useApi(apiData)
        if(data.value == null) return
        categories.value = data.value
    }

    return {
        categories,
        init
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}