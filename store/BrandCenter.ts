import { Category, CategoryProductSpecificationItem} from '@/utils/types'

export const useBrandCenterProductListingStore = defineStore("brand-center-product-listing-store", () => {

    interface ListingDetails {
        title: string
        description: string
        category: Category | null
        subcategory: any | null
        quantity: number
        price: number
        sku: string | null
        isbn: string | null
        images: File[] | any[]
    }

    interface ProdSpec {
        label: string, 
        value: string | number, 
        is_required: boolean
    }

    const hasVariants = ref<boolean>(false)
    const variantChips = ref<{label: string, value: string|number}[]>([])
    const currentStep = ref<number>(1)
    const steps = ref<{id: number, title: string}[]>([
        {id: 1, title: 'Add product listing'},
        {id: 2, title: 'Confirm product(s)'}
    ])

    const listingDetails = ref<ListingDetails>({
        title: '',
        description: '',
        category: null,
        subcategory: null,
        quantity: 0,
        price: 500,
        sku: null,
        isbn: null,
        images: []
    })

    const specifications = ref<CategoryProductSpecificationItem[]>([])
    const requiredProductSpecs = ref<ProdSpec[]|any[]>([])
    const otherProductSpecs = ref<ProdSpec[]|any[]>([])
    const imgFilesMax = shallowRef<number>(7)
    const previewImages = ref<any[]>([])

    const resestData = (): void => {
        hasVariants.value = false
        variantChips.value = []
        currentStep.value = 1
        steps.value = [
            {id: 1, title: 'Add product listing'},
            {id: 2, title: 'Confirm product(s)'}
        ]
        
        specifications.value = []
        requiredProductSpecs.value = []
        otherProductSpecs.value = []
        imgFilesMax.value = 7
        previewImages.value = []

        listingDetails.value = {
            title: '',
            description: '',
            category: null,
            subcategory: null,
            quantity: 0,
            price: 500,
            sku: null,
            isbn: null,
            images: []
        }
    }

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
        listingDetails,
        imgFilesMax,
        hasVariants,
        otherProductSpecs,
        previewImages,
        requiredProductSpecs,
        specifications,
        steps,
        variantChips
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterProductListingStore, import.meta.hot));
}