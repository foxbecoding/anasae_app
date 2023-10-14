<script lang="ts" setup>
import { useProductListingPageStore, useAuthStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const store = useProductListingPageStore()
const authStore = useAuthStore()

const LID = computed(() => {
    if (route.fullPath.includes('auth')){
        var lid = authStore.prevRoute.split('/').slice(-1)[0]
        if(lid.includes('?')){
            lid = lid.split('?').slice(0)[0]
        }
        return lid 
    }
    return route.params.lid
})

const {data: cachedListing} = await useNuxtData(`${config.public.API_PRODUCT_LISTING_PAGE}${LID.value}/`)
if(cachedListing.value){
    store.listing = cachedListing.value
} 

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_PRODUCT_LISTING_PAGE}${LID.value}/`,
    key: `${config.public.API_PRODUCT_LISTING_PAGE}${LID.value}/`
})
store.listing = data.value


</script>

<template>
    <div>
        <NuxtLayout name="product-listing-page-layout">
            <ProductListingPage />
        </NuxtLayout>
    </div>
</template>