<script lang="ts" setup>
import { useProductListingPageStore } from '@/store'

const config = useRuntimeConfig()
const store = useProductListingPageStore()
const route = useRoute()
const { IsAuthRoute, ProductVariant } = useProductListingPage()
const variantColors = ref<any[]>([])
const variantSizes = ref<any[]>([])
const selectedVariantColor = ref()
const selectedVariantSize = ref()
const variantColorOptions = ref<{value: string, image: string, disabled: boolean}[]>([])
const variantSizeOptions = ref<{value: string, disabled: boolean}[]>([])

const setPrice = (price: number) => price/100

const setSizes = (color: any = ''): void => {
    let selectedColor = color || selectedVariantColor.value
    let colors: any[] = []
    store.listing.products.map(
        (prod: any) => prod.specifications
        .map((spec: any) => {
            if(spec.label == 'Color' && spec.value == selectedColor){
                colors.push(prod.is_active)
            }
        })
    )
    for(let i = 0; i < variantSizeOptions.value.length; i++){
        variantSizeOptions.value[i].disabled = !colors[i]
    }

    var opts = variantSizeOptions.value.filter(x => !x.disabled).map(x => x.value)
    if(opts.length > 0){
        let productVariantSize = ProductVariant.value.specifications.find((x: any) => x.label == 'Size')?.value
        if(opts.includes(productVariantSize)){
            selectedVariantSize.value = productVariantSize
        }else{
            selectedVariantSize.value = opts[0]
        }
    }
}

const ProductTitle = computed(() => ProductVariant.value.title)
const ProductPrice = computed(() => setPrice(ProductVariant.value.price))
const ProductDescription = computed(() => ProductVariant.value.description)

const setVariant = (color: string, size: string): void => {
    let variant = store.listing.products.find((x: any) => String(x.variant).toLowerCase() == [color,size].toString().toLowerCase())
    
    if(!IsAuthRoute.value){
        store.currentVariant.color = color
        store.currentVariant.size = size
        store.currentVariant.variant_id = variant.uid
        navigateTo(`/product/${store.listing.uid}?v=${variant.uid}`)
    }else{
        selectedVariantColor.value = store.currentVariant.color
        selectedVariantSize.value = store.currentVariant.size
    }
}

watch(selectedVariantColor, (newValue) => {
    setSizes(newValue)
    setVariant(newValue, selectedVariantSize.value)
})

watch(selectedVariantSize, (newValue) => {
    setVariant(selectedVariantColor.value, newValue)
})

store.listing.products.forEach((prod: any) => {
    prod.specifications.map((spec: any) => {
        if(spec.label == 'Color' && !variantColors.value.includes(spec.value)){
            variantColors.value.push(spec.value)
        }else if(spec.label == 'Size' && !variantSizes.value.includes(spec.value)){
            variantSizes.value.push(spec.value)
        }
    })
})

variantColors.value.map(color => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == color 
            && !variantColorOptions.value.find(x => x.value == color)){
                variantColorOptions.value.push({value: color, image: prod.images[0], disabled: false})
            }
        })
    })
})

variantSizes.value.map(size => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == size 
            && !variantSizeOptions.value.find(x => x.value == size)){
                variantSizeOptions.value.push({value: size, disabled: false})
            }
        })
    })
})


selectedVariantColor.value = ProductVariant.value.specifications.find((x: any) => x.label == 'Color')?.value
</script>

<template>
    <v-card color="background">
        <v-card-title class="pt-0 px-0 text-wrap">{{ProductTitle }}</v-card-title>
        <v-card-title class="px-0 font-weight-black text-h5">${{ ProductPrice }}</v-card-title>
        
        <v-card-text class="px-0">
            <v-card-subtitle class="px-0">Description</v-card-subtitle>
            {{ ProductDescription }}
        </v-card-text>
        <v-container class="px-0">
            <p class="mb-2">Select color:</p>
            <v-container class="d-flex flex-wrap pa-0" fluid>
                <div
                    v-for="(color, i) in variantColorOptions"
                    :key="i" 
                    @click="!color.disabled ? selectedVariantColor = color.value : ''"
                    class="rounded-sm image-wrapper bg-surface-el mr-2 mb-12"
                    :class="[
                        color.disabled ? 'color-selection--disabled' : 'color-selection',
                        color.value == selectedVariantColor ? 'border text-primary-alt' : ''
                    ]"
                    v-ripple="!color.disabled"
                >
                    <v-img
                        eager
                        :src="{ 
                            src: config.public.CDN_URL+color.image, 
                            lazySrc: config.public.CDN_URL+color.image, 
                            aspect: 1
                        }" 
                    />
                    <small class="d-block">{{ color.value.toUpperCase() }}</small>
                </div>
            </v-container>
            <v-container class="pa-0" fluid>
                <p>Select size:</p>
                <v-chip-group mandatory v-model="selectedVariantSize" color="primary-alt">
                    <v-chip 
                        v-for="(size, s) in variantSizeOptions"
                        :key="s"
                        :value="size.value"
                        :disabled="size.disabled"
                        @click="selectedVariantSize = size.value"
                    >
                        {{ size.value.toUpperCase() }}
                    </v-chip>
                </v-chip-group>
            </v-container>
        </v-container>
    </v-card>
</template>

<style scoped>
.image-wrapper {
    width: 70px;
    height: 70px;
    position: relative;
    cursor: pointer;
}
</style>