<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()

const {data: cachedListing} = await useNuxtData(`${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`)
if(cachedListing.value){
    useProductListingStore().listing = cachedListing.value
} 

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`,
    key: `${config.public.API_PRODUCT_LISTING_PAGE}${route.params.lid}/`
})
useProductListingStore().listing = data.value

</script>

<template>
    <ProductListingPage />
</template>