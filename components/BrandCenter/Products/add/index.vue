<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
import ListingWindow from './ListingWindow/index.vue'
import ConfirmationWindow from './ConfirmationWindow/index.vue'
import VariantsWindow from './VariantsWindow/index.vue'

const config = useRuntimeConfig()
const store = useBrandCenterProductListingStore()
const isSubmitting = ref<boolean>(false)
const submitDialog = ref<boolean>(false)
const progress = ref<number>(5)
const windowItems = shallowRef([
    {id: 1, component: ListingWindow},
    {id: 2, component: ConfirmationWindow},
])

const WindowItem = computed(() => {
    if(store.hasVariants){
        windowItems.value = [
            {id: 1, component: ListingWindow},
            {id: 2, component: VariantsWindow},
            {id: 3, component: ConfirmationWindow}
        ]
    }else{
        windowItems.value = [
        {id: 1, component: ListingWindow},
    {id: 2, component: ConfirmationWindow}
        ]
    }
    let foundItem = windowItems.value.find(x => x.id == store.currentStep)
    if(foundItem){
        return foundItem.component
    }
    return {}
})

const IsFinalStep = computed((): boolean => store.steps.length === store.currentStep )

const IsNextDisabled = computed((): boolean => {
    if(!store.listingDetails.title) return true
    if(!store.listingDetails.description) return true
    if(!store.listingDetails.category) return true
    if(store.listingDetails.quantity == 0) return true
    if(!store.listingDetails.price || store.listingDetails.price < 500) return true
    if(store.listingDetails.images.length == 0) return true
    if(store.hasVariants && store.requiredProductSpecs.length > 0){
        let chips: string[] = []
        store.variantChips.forEach(x => {
            if(!chips.includes(x.label)){
                chips.push(x.label)
            }    
        })
        return chips.length != store.requiredProductSpecs.length
    }else if(!store.hasVariants && store.requiredProductSpecs.length > 0){
        if(store.requiredProductSpecs.length > 0){
            let found = store.requiredProductSpecs.filter(x => !x.value ? true : false)
            if(found.length > 0) return true
            return false
        }
    }
    
    return false
})

const nextStep = (): void => {
    if(store.currentStep === 1 && store.hasVariants){
        let specs: any = {}
        let variantData: any[] = []
        store.requiredProductSpecs.map(x => {
            specs[`${x.label}`] = store.variantChips.filter(v => v.label == x.label)
        })

        specs.Color.map((color: any) => {
            specs.Size.map((size: any) => variantData.push(
                { 
                    title: store.listingDetails.title,
                    description: store.listingDetails.description,
                    category: store.listingDetails.category,
                    subcategory: store.listingDetails.subcategory,
                    quantity: store.listingDetails.quantity,
                    price: store.listingDetails.price,
                    sku: store.listingDetails.sku,
                    images: store.listingDetails.images,
                    variant: `${color.value},${size.value}`,
                    specifications: [color, size, ...store.otherProductSpecs],
                    is_active: false
                }
            ))
        })
        store.productVariants = variantData
        for(let i = 0; i < store.productVariants.length; i++){
            store.productVariants[i].id = i+1
        }
        store.currentStep+=1
        return
    }else if(store.currentStep === 2 && store.hasVariants){
        if(store.selectedVariants.length === 0){
            useSnackbarStore().setSnackbar(
                'Please select and activate variants', 
                true, 
                '', 
                'error'
            )
            return
        }
        store.productVariants.map((x: any) => {
            if(store.selectedVariants.includes(x)){
                x.is_active = true
            }else{
                x.is_active = false
            }
        })
        store.currentStep+=1
        return
    }
    store.currentStep+=1
}

const submitDetails = async(): Promise<any[] | void> => {
    let productDetails = [
        {
            title: store.listingDetails.title,
            description: store.listingDetails.description,
            category: store.listingDetails.category?.pk,
            subcategory: null,
            quantity: store.listingDetails.quantity,
            sku: store.listingDetails.sku,
            brand: useBrandStore().brands[0].pk,
            is_active: true
        }
    ]
    
    if(store.hasVariants){
        productDetails = []
        store.productVariants.map(x => {
            productDetails.push({
                title: x.title,
                description: x.description,
                category: x.category?.pk,
                subcategory: null,
                quantity: x.quantity,
                sku: x.sku,
                brand: useBrandStore().brands[0].pk,
                is_active: x.is_active
            })
        })
    }

    const { data, error, status } = await useApi({
        method: 'POST', 
        path: `${config.public.API_PRODUCT}`, 
        data: productDetails
    })

    if(status.value == 'error'){
        isSubmitting.value = false
        console.log(error.value)
        return 
    }
    progress.value = 25
    return data.value
}

const submitImages = async(products: any[]) => {
    let productImages = [store.listingDetails.images]
    
    if(store.hasVariants){
        productImages = []
        store.productVariants.map(x => productImages.push(x.images))
    }

    for(let i = 0; i < products.length; i++){
        let formData = new FormData
        let product = products[i]
        productImages[i].map(x => formData.append('images', x))
        formData.append('product', product.pk)

        const { data, error, status } = await useApi({
            method: 'POST', 
            path: `${config.public.API_PRODUCT_IMAGE}`, 
            data: formData,
            isMultiPart: true
        })

        if(status.value == 'error'){
            isSubmitting.value = false
            console.log(error.value)
            return status.value
        }
    }
    progress.value = 50
    return 'success'
}

const submitPrices = async(products: any[]) => {
    let productPrices = [store.listingDetails.price]

    if(store.hasVariants){
        productPrices = []
        store.productVariants.map(x => productPrices.push(x.price))
    }

    let productPricesData = []
    for(let i = 0; i < products.length; i++){
        let product = products[i]
        productPricesData.push({price: productPrices[i], product: product.pk})
    }

    const { data, error, status } = await useApi({
        method: 'POST', 
        path: `${config.public.API_PRODUCT_PRICE}`, 
        data: productPricesData
    })

    if(status.value == 'error'){
        isSubmitting.value = false
        console.log(error.value)
        return status.value
    }
    progress.value = 75
    return status.value
}

const submitSpecs = async(products: any[]) => {
    let productSpecs = [[...store.requiredProductSpecs, ...store.otherProductSpecs]]

    if(store.hasVariants){
        productSpecs = []
        store.productVariants.map(x => productSpecs.push(x.specifications))
    }

    let productSpecsData: any[] = []
    for(let i = 0; i < products.length; i++){
        let product = products[i]
        productSpecs[i].map(x => productSpecsData.push({
            label: x.label, 
            value: x.value,
            is_required: x.is_required,
            product: product.pk
        }))
    }

    const { data, error, status } = await useApi({
        method: 'POST', 
        path: `${config.public.API_PRODUCT_SPECIFICATION}`, 
        data: productSpecsData
    })

    if(status.value == 'error'){
        isSubmitting.value = false
        console.log(error.value)
        return status.value
    }
    progress.value = 100
    return status.value
}

const submit = async(): Promise<void> => {
    submitDialog.value = true
    isSubmitting.value = true
    let products = await submitDetails()
    if(products){
        let imagesStatus = await submitImages(products)
        if(imagesStatus == 'error'){ isSubmitting.value = false; return } 
        
        let pricesStatus = await submitPrices(products)
        if(pricesStatus == 'error'){ isSubmitting.value = false; return }
        
        let specsStatus = await submitSpecs(products)
        if(specsStatus == 'error'){ isSubmitting.value = false; return }
    }    
    submitDialog.value = false
    isSubmitting.value = false
    navigateTo('/brand-center/manage-products')
    useSnackbarStore().setSnackbar('Product listing added', true)
    store.resetData()
}

</script>

<template>
    <v-stepper 
        v-model="store.currentStep"
        class="mx-0"
        :mobile="$vuetify.display.smAndDown"
        bg-color="background"
        color="primary-alt"
        :flat="true"
    >
        <template v-slot:default>
            <v-stepper-header>
                <template v-for="step in store.steps" :key="`${step.id}-step`">
                    <v-stepper-item
                        :complete="store.currentStep > step.id"
                        :step="`Step ${ step.id }`"
                        :value="step.id"
                        :title="step.title"
                        color="primary-alt"
                    ></v-stepper-item>

                    <v-divider
                        v-if="step.id !== store.steps.length"
                        :key="step.id"
                    ></v-divider>
                </template>
            </v-stepper-header>

            <v-stepper-window style="margin: 0px !important;">
                <v-stepper-window-item
                    v-for="step in store.steps"
                    :key="`${step.id}-content`"
                    :value="step.id"
                >
                    <component :is="WindowItem"/>
                </v-stepper-window-item>
            </v-stepper-window>
            <v-container class="px-6 d-flex" fluid>
                <v-btn 
                    @click="store.currentStep-=1" 
                    variant="text"
                    :disabled="store.currentStep === 1"
                >
                    Previous
                </v-btn>
                <v-spacer />
                <v-btn 
                    @click="!IsFinalStep ? nextStep() : submit()"
                    color="primary-alt" 
                    variant="tonal" 
                    :loading="isSubmitting"
                    :disabled="IsNextDisabled || isSubmitting"
                >
                    {{ !IsFinalStep ? 'Next' : 'Submit'}}
                </v-btn>
            </v-container>
        </template>
    </v-stepper>
    <v-dialog
      v-model="submitDialog"
      width="auto"
    >
      <v-card class="rounded-lg">
        <v-card-title class="text-wrap">
            Submitting product listing 
        </v-card-title>
        <v-card-text>
            <v-progress-linear
                v-model="progress"
                color="primary-alt"
                height="25"
                rounded="pill"
            >
                <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                </template>
            </v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<style scoped>
.v-stepper.v-sheet {
    box-shadow: none !important;
}

.v-stepper-header {
    box-shadow: none !important;
}
.v-stepper-window {
    margin: 0 !important;
}
</style>