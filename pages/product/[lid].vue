<script lang="ts" setup>
import { useProductListingStore, useAuthStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const store = useProductListingStore()
const authStore = useAuthStore()

definePageMeta({
    layout:  false
})

const LID = computed(() => {
    if (route.fullPath.includes('auth')){
        //finish fixing this shit
        var path = authStore.prevRoute.split('/').slice(-1)[0]
        if(path.includes('?')){
            console.log(path)
        }
        return authStore.prevRoute.split('/').slice(-1)[0]   
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