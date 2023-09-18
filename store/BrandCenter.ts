import { Category } from '@/utils/types'

export const useBrandCenterProductStore = defineStore("brand-center-product-store", () => {

    interface FormData {
        title: string
        description: string
        category: Category | null
        quantity: number
        price: number
        sku: string
        isbn: string
        images: File[] | any[]
    }

    const isVariants = ref<boolean>(false)
    const currentStep = ref<number>(1)
    const steps = ref<{id: number, title: string}[]>([
        {id: 1, title: 'Add product listing'},
        {id: 2, title: 'Confirm product(s)'}
    ])
    
    const formData = reactive<FormData>({
        title: '',
        description: '',
        category: null,
        quantity: 0,
        sku: '',
        isbn: '',
        images: []
    })

    const imgFilesMax = shallowRef<number>(7)
    const previewImages = ref<any[]>([])

    return {
        currentStep,
        formData,
        imgFilesMax,
        isVariants,
        previewImages,
        steps
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterProductStore, import.meta.hot));
}