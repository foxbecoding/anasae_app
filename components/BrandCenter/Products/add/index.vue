<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductStore } from '@/store'
import ListingWindow from './ListingWindow/index.vue'
import ConfirmationWindow from './ConfirmationWindow/index.vue'
import VariantsWindow from './VariantsWindow/index.vue'

const config = useRuntimeConfig()
const store = useBrandCenterProductStore()
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

const submit = async(): Promise<void> => {
    let productDetails = [
        {
            title: store.listingDetails.title,
            description: store.listingDetails.description,
            category: store.listingDetails.category?.pk,
            quantity: store.listingDetails.quantity,
            sku: store.listingDetails.sku,
            isbn: store.listingDetails.isbn,
            brand: useBrandStore().brands[0].pk
        }
    ]

    // Add Products
    const { data:products, error:detailsError, status:detailsStatus } = await useApi({
            method: 'POST', 
            path: `${config.public.API_PRODUCT}`, 
            data: productDetails
        })
        
    // Add Images
    let productImages = [store.listingDetails.images]
    let formData = new FormData
    for(let i = 0; i < products.length; i++){
        let product = products[i]
        productImages[i].forEach(x => formData.append('images', x))
        formData.append('product', product.pk)
    }
    const { data:images, error:imagesError, status:imagesStatus } = await useApi({
        method: 'POST', 
        path: `${config.public.API_PRODUCT_IMAGE}`, 
        data: formData,
        isMultiPart: true
    })

    // Add Price
    // price: store.formData.price,

    // Add Specifications
    // specifications: [...store.requiredProductSpecs, ...store.otherProductSpecs],
    
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
                    @click="!IsFinalStep ? store.currentStep+=1 : submit()"
                    color="primary-alt" 
                    variant="tonal" 
                    :disabled="IsNextDisabled"
                >
                    {{ !IsFinalStep ? 'Next' : 'Submit'}}
                </v-btn>
            </v-container>
        </template>
    </v-stepper>
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