<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const store = useProductListingStore()
const currentImg = ref()

const setImg = (img: any) => currentImg.value = img

const ProductImage = computed(() => {
    let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
    if(currentImg.value) return currentImg.value
    return product_variant.images[0]
})
const ProductPreviewImages = computed(() => {
    let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
    return product_variant.images
})

</script>

<template>
    <v-img  :src="config.public.CDN_URL+ProductImage" class="bg-surface-el rounded-lg" aspect-ratio="1"/>
    <v-container class="d-flex flex-wrap pa-0 mt-4" fluid>
        <div 
            v-for="(img, i) in ProductPreviewImages"
            :key="i"
            class="product-image-container mr-2 mb-2 bg-surface-el rounded"
            @click="setImg(img)"
            @mouseover="setImg(img)"
        >
            <v-img 
                class="product-image"
                :src="config.public.CDN_URL+img" 
                
            />
        </div>
        <!-- <v-img 
            class="bg-surface-el rounded-lg mr-2 cursor-pointer"
            v-for="(img, i) in store.ProductPreviewImages"
            :key="i"
            :src="config.public.CDN_URL+img" 
            max-width="60px"
            aspect-ratio="1"
            @mouseover="store.setImg(img)"
        /> -->
    </v-container>
</template>

<style scoped>
.product-image-container {
    width: 50px;
    height: 50px;
    position: relative;
}

.product-image:hover{
    cursor: pointer;
    opacity: 0.8;
}

.product-image:active{
    opacity: 0.5;
}
</style>