<script lang="ts" setup>

const config = useRuntimeConfig()
const { ProductVariant } = useProductListingPage()
const currentImg = ref()

const setImg = (img: any) => currentImg.value = img

const ProductImage = computed(() => {
    if(currentImg.value) return currentImg.value
    return ProductVariant.value.images[0]
})
const ProductPreviewImages = computed(() => ProductVariant.value.images)

watch(ProductVariant, () => currentImg.value = '')

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