<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore } from '@/store'

const store = useBrandCenterProductListingStore()
const currentImg = ref()
const variantColors = ref<any[]>([])
const variantSizes = ref<any[]>([])
const selectedVariantColor = ref()
const selectedVariantSize = ref()
const variantColorOptions = ref<{value: string, image: string, disabled: boolean}[]>([])
const variantSizeOptions = ref<{value: string, disabled: boolean}[]>([])

const setPrice = (price: number) => price/100
const setImg = (img: any) => currentImg.value = img

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

const CurrentVariant = computed(() => {
    let variant = store.productVariants.filter(x => x.variant == [selectedVariantColor.value, selectedVariantSize.value].toString())
    return variant[0]
})

if(store.hasVariants){
    selectedVariantColor.value = store.selectedVariants[0].specifications.find(x => x.label == 'Color')?.value
    selectedVariantSize.value = store.selectedVariants[0].specifications.find(x => x.label == 'Size')?.value
}

const setSizes = (color: any = ''): void => {
    let selectedColor = color || selectedVariantColor.value
    let colors: any[] = []
    store.productVariants.map(
        prod => prod.specifications
        .map(spec => {
            if(spec.label == 'Color' && spec.value == selectedColor){
                colors.push(prod.is_active)
            }
        })
    )
    for(let i = 0; i < variantSizeOptions.value.length; i++){
        variantSizeOptions.value[i].disabled = !colors[i]
    }
    var opts = variantSizeOptions.value.filter(x => !x.disabled)
    if(opts.length > 0){
        selectedVariantSize.value = opts[0].value
    }
}

setSizes()

const ProductTitle = computed(() => {
    if(!store.hasVariants) return store.listingDetails.title
    return CurrentVariant.value.title
})

const ProductPrice = computed(() => {
    if(!store.hasVariants) return setPrice(store.listingDetails.price)
    return setPrice(CurrentVariant.value.price)
})

const ProductDescription = computed(() => {
    if(!store.hasVariants) return store.listingDetails.description
    return CurrentVariant.value.description
})

const ProductImage = computed(() => {
    if(currentImg.value) return currentImg.value
    if(!store.hasVariants) return store.previewImages[0]
    return URL.createObjectURL(CurrentVariant.value.images[0]) 
})

const ProductPreviewImages = computed(() => {
    if(!store.hasVariants) return store.previewImages
    let images: any[] = []
    CurrentVariant.value.images.map(x => images.push(URL.createObjectURL(x)))
    return images
})

watch(selectedVariantColor, (newValue) => {
    currentImg.value = URL.createObjectURL(CurrentVariant.value.images[0])
    setSizes(newValue)
})

</script>

<template>
    <h1 class="text-h5 text-sm-h4 px-6">Preview listing</h1>
    <v-container class="px-6" fluid>
        <v-row>
            <v-col
                cols="12" sm="6" md="6" lg="5" 
            >
                <v-img :src="ProductImage" class="bg-surface-el rounded-lg"/>
                <v-container class="d-flex flex-wrap pa-0 mt-4" fluid>
                    <div 
                        v-for="(img, i) in ProductPreviewImages"
                        :key="i"
                        class="product-image-container mr-2 mb-2 bg-surface-el rounded"
                    >
                        <v-img 
                            class="product-image"
                            :src="img" 
                            @click="setImg(img)"
                            @mouseover="setImg(img)"
                        />
                    </div>
                </v-container>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="7">
                <v-card color="background">
                    <v-card-title class="pt-0 px-0 text-wrap">{{ ProductTitle }}</v-card-title>
                    <v-card-title class="px-0">${{ ProductPrice }}</v-card-title>
                    <v-card-text class="px-0">
                        {{ ProductDescription }}<br>
                        <div 
                            v-if="store.requiredProductSpecs.length > 0 && !store.hasVariants"
                            class="py-4"
                        >
                            <span v-for="(spec, i) in store.requiredProductSpecs">
                                {{ spec.label }}: {{ spec.value.toLowerCase() }}<br>
                            </span>
                        </div>
                        <v-container class="px-0" v-else>
                            <p class="mb-2">Colors</p>
                            <div class="d-flex">
                                <div
                                    v-for="(color, i) in variantColorOptions"
                                    :key="i" 
                                    @click="!color.disabled ? selectedVariantColor = color.value : ''"
                                    class="rounded-sm image-wrapper bg-surface-el mr-2 "
                                    :class="[
                                        color.disabled ? 'color-selection--disabled' : 'color-selection',
                                        color.value == selectedVariantColor ? 'border text-primary-alt' : ''
                                    ]"
                                    v-ripple="!color.disabled"
                                >
                                    <v-img :src="color.image" />
                                    <small>{{ color.value }}</small>
                                </div>
                            </div>
                            <div class="mt-8">
                                <p>Sizes</p>
                                <v-chip-group mandatory v-model="selectedVariantSize" color="primary-alt">
                                    <v-chip 
                                        v-for="(size, s) in variantSizeOptions"
                                        :key="s"
                                        :value="size.value"
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
            
        </v-row>
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

.image-wrapper{
    width: 70px;
    height: 70px;
}

.color-selection:hover {
    cursor:pointer;
    opacity: 0.8;
}
.color-selection:active{
    opacity: 0.5;
}
.color-selection--disabled{
    opacity: 0.3;
}
</style>