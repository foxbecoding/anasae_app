<script lang="ts" setup>

const config = useRuntimeConfig()
const { ProductVariant } = useProductListingPage()
const currentImg = ref()
const imgModel = ref(0)
const isImgLoaded = ref<boolean>(false)

const setImg = (img: any) => currentImg.value = img

const ProductImage = computed(() => {
    if(currentImg.value) return currentImg.value
    return ProductVariant.value.images[0]
})
const ProductPreviewImages = computed(() => ProductVariant.value.images)

const AspectRatio = computed(() =>{
    if(!isImgLoaded.value) return 1
    var img = new Image();
    img.src = config.public.CDN_URL+ProductImage
    let imgW:number = 0
    let imgH: number = 0
    img.onload = () => {
        imgW = img.width
        imgH = img.height
    }
    return imgW/imgH
})     

watch(ProductVariant, () => {
    currentImg.value = '',
    imgModel.value = 0
})

</script>

<template>
    <v-img 
        class="bg-surface-el rounded-lg d-none d-sm-block" 
        :src="config.public.CDN_URL+ProductImage"
        :lazy-src="config.public.CDN_URL+ProductImage"
        @load="(e:any) => isImgLoaded = true"
        :aspect-ratio="AspectRatio"
        eager
    />
    <v-carousel
        class="bg-surface-el d-block d-sm-none"
        :continuous="false"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-circle"
        height="350"
        v-model="imgModel"
        mandatory
    >
        <v-carousel-item
            v-for="(img, i) in ProductPreviewImages"
            :key="i"
            :src="config.public.CDN_URL+img"
            :lazy-src="config.public.CDN_URL+img"
            aspect-ratio="1"
            eager
            :value="i"
            
        >
        </v-carousel-item>
    </v-carousel>
    <v-container class="d-none d-sm-flex flex-wrap pa-0 mt-4" fluid>
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
                :lazy-src="config.public.CDN_URL+img"
                aspect-ratio="1"
                eager
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