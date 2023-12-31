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
        length: string
        width: string
        height: string
        weight: string
    }

    interface ProdSpec {
        label: string
        value: string | number
        variantValues?: any[]
        is_required: boolean
    }

    interface ProductVariant extends ListingDetails {
        id: string|number
        variant: string
        previewImages: string[]
        is_active: boolean
        lengthUnit: string
        widthUnit: string
        heightUnit: string
        weightUnit: string
        specifications: ProdSpec[]
    }

    const lid = ref()
    const hasVariants = ref<boolean>(false)
    const variantChips = ref<ProdSpec[]>([])
    const productVariants = ref<ProductVariant[]>([])
    const selectedVariants =  ref<ProductVariant[]>([])
    const specifications = ref<CategoryProductSpecificationItem[]>([])
    const requiredProductSpecs = ref<ProdSpec[]|any[]>([])
    const otherProductSpecs = ref<ProdSpec[]|any[]>([])
    const imgFilesMax = shallowRef<number>(7)
    const previewImages = ref<any[]>([])
    const currentStep = ref<number>(1)
    const quantityLimit = shallowRef([ ...Array(50).keys() ].map( i => i+1))
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
        images: [],
        length: '',
        width: '',
        height: '',
        weight: ''
    })

    const lengthUnit = ref<string>('in')
    const widthUnit = ref<string>('in')
    const heightUnit = ref<string>('in')
    const weightUnit = ref<string>('oz')

    const resetData = (): void => {
        hasVariants.value = false
        variantChips.value = []
        productVariants.value = []
        selectedVariants.value = []
        specifications.value = []
        requiredProductSpecs.value = []
        otherProductSpecs.value = []
        previewImages.value = []
        currentStep.value = 1
        steps.value = [
            {id: 1, title: 'Add product listing'},
            {id: 2, title: 'Confirm product(s)'}
        ]

        lengthUnit.value = 'in'
        widthUnit.value = 'in'
        heightUnit.value = 'in'
        weightUnit.value = 'oz'

        listingDetails.value = {
            title: '',
            description: '',
            category: null,
            subcategory: null,
            quantity: 0,
            price: 500,
            sku: null,
            isbn: null,
            images: [],
            length: '',
            width: '',
            height: '',
            weight: ''
        }
    }

    const setVariantField = (specs: any[]) => {
        let specValues = specs.map(x => {
            if(x.is_required){
                return x.value
            }
        }).filter(x => x).toString()
    
        return specValues
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
        hasVariants,
        heightUnit,
        imgFilesMax,
        lengthUnit,
        lid,
        listingDetails,
        otherProductSpecs,
        previewImages,
        productVariants,
        quantityLimit,
        requiredProductSpecs,
        selectedVariants,
        specifications,
        steps,
        variantChips,
        widthUnit, 
        weightUnit,
        resetData,
        setVariantField
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterProductListingStore, import.meta.hot));
}