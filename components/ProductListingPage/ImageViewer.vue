<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const config = useRuntimeConfig()
const store = useProductListingStore()
</script>

<template>
    <v-img  :src="config.public.CDN_URL+store.ProductImage" class="bg-surface-el rounded-lg" aspect-ratio="1"/>
    <v-container class="d-flex flex-wrap pa-0 mt-4" fluid>
        <div 
            v-for="(img, i) in store.ProductPreviewImages"
            :key="i"
            class="product-image-container mr-2 mb-2 bg-surface-el rounded"
            @click="store.setImg(img)"
            @mouseover="store.setImg(img)"
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