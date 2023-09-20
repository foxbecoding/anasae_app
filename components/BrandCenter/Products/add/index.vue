<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'
import ListingWindow from './ListingWindow/index.vue'
import ConfirmationWindow from './ConfirmationWindow/index.vue'
import VariantsWindow from './VariantsWindow/index.vue'

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
    // if(IsFinalStep.value){ return true }
    // else if(!store.hasVariants && store.currentStep == 2){ return true }
    if(!store.formData.title) return true
    if(!store.formData.description) return true
    if(!store.formData.category) return true
    if(store.formData.quantity == 0) return true
    if(!store.formData.price || store.formData.price < 500) return true
    if(store.formData.images.length == 0) return true
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
    if(store.currentStep === 1){
        // specifications: ProdSpec[]
        let products = [
            {
                title: store.formData.title,
                description: store.formData.description,
                category: store.formData.category?.pk,
                quantity: store.formData.quantity,
                price: store.formData.price,
                sku: store.formData.sku,
                isbn: store.formData.isbn,
                images: store.formData.images.length,
                specifications: [...store.requiredProductSpecs, ...store.otherProductSpecs],
            }
        ]
    }
    // store.validateProducts()
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

            <!-- <v-stepper-actions
            ></v-stepper-actions> -->
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
                    @click="!IsFinalStep ? store.currentStep+=1 : false"
                    color="primary-alt" 
                    variant="tonal" 
                    :disabled="IsNextDisabled"
                >
                    {{ !IsFinalStep ? 'Next' : 'Submit'}}
                </v-btn>
            </v-container>
            <!-- <v-stepper-actions
                :disabled="IsDisabled"
                @click:prev="store.currentStep-=1"
                @click:next="store.currentStep+=1"
            ></v-stepper-actions> -->
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