<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore } from '@/store'

const store = useBrandCenterProductListingStore()
const currentImg = ref()
const currentVariant = ref()
const variantColors = ref<any[]>([])
const variantSizes = ref<any[]>([])
const selectedVariantColor = ref()
const selectedVariantSize = ref()
const variantColorOptions = ref<{value: string, image: string, disabled: boolean}[]>([])
const variantSizeOptions = ref<{value: string, disabled: boolean}[]>([])

const setPrice = (price: number) => price/100
const setImg = (img: any) => currentImg.value = img
currentImg.value = store.previewImages[0]

store.productVariants.forEach(x => {
    x.specifications.map(x => {
        if(x.label == 'Color' && !variantColors.value.includes(x.value)){
            variantColors.value.push(x.value)
        }else if(x.label == 'Size' && !variantSizes.value.includes(x.value)){
            variantSizes.value.push(x.value)
        }
    })
})

variantColors.value.map(color => {
    store.productVariants.map(prod => {
        prod.specifications.map(spec => {
            if(spec.value == color 
            && !variantColorOptions.value.find(x => x.value == color)){
                variantColorOptions.value.push({value: color, image: URL.createObjectURL(prod.images[0]), disabled: false})
            }
        })
    })
})

variantSizes.value.map(size => {
    store.productVariants.map(prod => {
        prod.specifications.map(spec => {
            if(spec.value == size 
            && !variantSizeOptions.value.find(x => x.value == size)){
                variantSizeOptions.value.push({value: size, disabled: false})
            }
        })
    })
})

currentVariant.value = store.selectedVariants[0]

const ProductTitle = computed(() => {
    if(!store.hasVariants) return store.listingDetails.title
    return currentVariant.value.title
})
</script>

<template>
    <h1 class="text-h5 text-sm-h4 px-6">Preview listing</h1>
    <v-container class="px-6" fluid>
        <v-row>
            <v-col
                cols="12" sm="5" md="4" lg="4" 
                align-self="center" 
                align="center"
            >
                <v-img :src="currentImg" class="bg-surface-el rounded-lg"/>
            </v-col>
            <v-col class="d-block d-sm-none" cols="12">
                <v-container class="d-flex flex-wrap pa-0" fluid>
                    <div 
                        v-for="(img, i) in store.previewImages"
                        :key="i"
                        class="product-image-container mr-2 mb-2 bg-surface-el rounded"
                    >
                        <v-img 
                            class="product-image"
                            :src="img" 
                            @click="setImg(img)"
                        />
                    </div>
                </v-container>
            </v-col>
            <v-col cols="12" sm="7" md="8" lg="8">
                <v-card color="background">
                    <v-card-title class="pt-0 px-0 text-wrap">{{ ProductTitle }}</v-card-title>
                    <v-card-title class="px-0">${{store.listingDetails.price ? setPrice(store.listingDetails.price) : '' }}</v-card-title>
                    <v-card-text class="px-0">
                        {{ store.listingDetails.description }}<br>
                        <div 
                            v-if="store.requiredProductSpecs.length > 0 && !store.hasVariants"
                            class="py-4"
                        >
                            <span v-for="(spec, i) in store.requiredProductSpecs">
                                {{ spec.label }}: {{ spec.value.toLowerCase() }}<br>
                            </span>
                        </div>
                        <v-container class="px-0" v-else>
                            <p>Colors</p>
                            <div class="d-flex">
                                <div
                                    v-for="(color, i) in variantColorOptions"
                                    :key="i" 
                                    class="image-wrapper bg-surface-el mr-2"
                                >
                                    <v-img :src="color.image" />
                                    <small>{{ color.value }}</small>
                                </div>
                            </div>
                            <div class="mt-8">
                                <p>Sizes</p>
                                <v-chip-group color="primary-alt">
                                    <v-chip 
                                        v-for="(size, s) in variantSizeOptions"
                                        :key="s"
                                        :disabled="size.disabled"
                                    >
                                        {{ size.value }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="d-none d-sm-block" cols="12">
                <v-container class="d-flex flex-wrap pa-0" fluid>
                    <div 
                        v-for="(img, i) in store.previewImages"
                        :key="i"
                        class="product-image-container mr-2 mb-2 bg-surface-el rounded"
                    >
                        <v-img 
                            class="product-image"
                            :src="img" 
                            @click="setImg(img)"
                        />
                    </div>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.product-image-container {
    /* max-width: 350px;
    max-height: 350px; */
    width: 50px;
    height: 50px;
    position: relative;
}

.product-image:hover{
    cursor: pointer;
}

.image-wrapper{
    width: 70px;
    height: 70px;
}

</style>