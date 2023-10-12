<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const store = useProductListingStore()

// store.resetData()

const {data: cachedListing} = await useNuxtData(`${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`)
if(cachedListing.value){
    store.listing = cachedListing.value
} 

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`,
    key: `${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`
})
store.listing = data.value

store.listing.products.forEach((prod: any) => {
    prod.specifications.map((spec: any) => {
        if(spec.label == 'Color' && !store.variantColors.includes(spec.value)){
            store.variantColors.push(spec.value)
        }else if(spec.label == 'Size' && !store.variantSizes.includes(spec.value)){
            store.variantSizes.push(spec.value)
        }
    })
})

store.variantColors.map(color => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == color 
            && !store.variantColorOptions.find(x => x.value == color)){
                store.variantColorOptions.push({value: color, image: prod.images[0], disabled: false})
            }
        })
    })
})

store.variantSizes.map(size => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == size 
            && !store.variantSizeOptions.find(x => x.value == size)){
                store.variantSizeOptions.push({value: size, disabled: false})
            }
        })
    })
})

let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
store.selectedVariantColor = product_variant.specifications.find((x: any) => x.label == 'Color')?.value
store.selectedVariantSize = product_variant.specifications.find((x: any) => x.label == 'Size')?.value
// store.currentImg = product_variant.images[0]
// console.log(product_variant)
store.setSizes()


</script>

<template>
    <ProductListingPage />
</template>