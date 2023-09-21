<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore, useCategoryStore } from '@/store'
import { 
    Category, 
    CategoryProductSpecificationItem,
    FormTextField, 
    FormSelectField 
} from '@/utils/types'

const config = useRuntimeConfig()
const store = useBrandCenterProductListingStore()
const categoryStore = useCategoryStore()
const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        counter: 90,
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'Title', 
        model: store.listingDetails.title, 
        name:'title', 
        rules: [ 
            (v: any) => !! v || 'Title is required',
            (v: any) => v.length <= 90 || 'Must be 90 characters or less', 
        ],
        type: 'text', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        counter: 300,
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 2, 
        inputType: 'TEXTAREA',
        label: 'Description', 
        model: store.listingDetails.description, 
        name:'description', 
        rules: [ 
            (v: any) => !! v || 'Description is required',
            (v: any) => v.length <= 300 || 'Must be 300 characters or less', 
        ],
        type:'password', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        flat: true, 
        color: "primary",
        density: 'comfortable',
        id: 3, 
        inputType: 'SELECT',
        items: categoryStore.categories,
        label: "Category",
        model: store.listingDetails.category,
        name: 'category',
        returnObject: true,
        rules: [ (v: any) => !! v || 'Category is required' ],
        variant: 'solo'
    } as FormSelectField
])

const CategoryFormData = computed((): Category => store.listingDetails.category as Category)

watch(CategoryFormData, async (newCategory) => {
    const {data, error, status, pending} = await useApi({
        method: 'GET',
        path: `${config.public.API_CATEGORY_PRODUCT_SPECIFICATIONS}${newCategory.product_specification}/`
    })
    store.specifications = data.value as CategoryProductSpecificationItem[]
    let requiredSpecs: any[] = [] 
    let otherSpecs: any[] = []
    store.specifications.forEach(x => {
        if (x.is_required){
            requiredSpecs.push({label: x.item, value: '', is_required: x.is_required})
        }else{
            let brandName = useBrandStore().brands[0].name
            otherSpecs.push({
                label: x.item, 
                value: `${x.item == 'Brand' ? brandName : ''}`, 
                is_required: x.is_required
            })
        }
    })
    store.requiredProductSpecs = requiredSpecs
    store.otherProductSpecs = otherSpecs
})
</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Details</v-card-title>
        <v-card-text class="px-0">
            <FormFields
                :store="store.listingDetails"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>