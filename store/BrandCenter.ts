import { Category, CategoryProductSpecificationItem} from '@/utils/types'

export const useBrandCenterProductStore = defineStore("brand-center-product-store", () => {

    interface FormData {
        title: string
        description: string
        category: Category | null
        quantity: number
        price: number | null
        sku: string
        isbn: string
        images: File[] | any[]
    }

    const hasVariants = ref<boolean>(false)
    const currentStep = ref<number>(1)
    const steps = ref<{id: number, title: string}[]>([
        {id: 1, title: 'Add product listing'},
        {id: 2, title: 'Confirm product(s)'}
    ])
    
    const formData = ref<FormData>({
        title: '',
        description: '',
        category: null,
        quantity: 0,
        price: null,
        sku: '',
        isbn: '',
        images: []
    })

    interface ProdSpec {
        label: string | number, 
        value: string | number, 
        is_required: boolean
    }
    const specifications = ref<CategoryProductSpecificationItem[]>([])
    const requiredProductSpecs = ref<ProdSpec[]|any[]>([])
    const otherProductSpecs = ref<ProdSpec[]|any[]>([])


    const imgFilesMax = shallowRef<number>(7)
    const previewImages = ref<any[]>([])

    watch(hasVariants, (newData) => {
        if(newData){
            steps.value = [
                {id: 1, title: 'Add product listing'},
                {id: 2, title: 'Product variants'},
                {id: 3, title: 'Confirm product(s)'}
            ]
        }else{
            steps.value = [
                {id: 1, title: 'Add product listing'},
                {id: 2, title: 'Confirm product(s)'}
            ]
        }
    })

    return {
        currentStep,
        formData,
        imgFilesMax,
        hasVariants,
        otherProductSpecs,
        previewImages,
        requiredProductSpecs,
        specifications,
        steps
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterProductStore, import.meta.hot));
}