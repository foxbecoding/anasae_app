<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const props = defineProps(['listing'])

const route = useRoute()
const store = useProductListingStore()
const variantColors = ref<any[]>([])
const variantSizes = ref<any[]>([])
const selectedVariantColor = ref()
const selectedVariantSize = ref()
const variantColorOptions = ref<{value: string, image: string, disabled: boolean}[]>([])
const variantSizeOptions = ref<{value: string, disabled: boolean}[]>([])

const setPrice = (price: number) => price/100

const setSizes = (color: any = ''): void => {
        let selectedColor = color || selectedVariantColor.value
        let colors: any[] = []
        store.listing.products.map(
            (prod: any) => prod.specifications
            .map((spec: any) => {
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

    const ProductTitle = computed(() => {
        let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
        return product_variant.title
    })
    const ProductPrice = computed(() => {
        let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
        return setPrice(product_variant.price)
    })
    const ProductDescription = computed(() =>{
        let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
        return product_variant.description
    })

    
    watch(selectedVariantColor, (newValue) => {
        setSizes(newValue)
    })

store.listing.products.forEach((prod: any) => {
    prod.specifications.map((spec: any) => {
        if(spec.label == 'Color' && !variantColors.value.includes(spec.value)){
            variantColors.value.push(spec.value)
        }else if(spec.label == 'Size' && !variantSizes.value.includes(spec.value)){
            variantSizes.value.push(spec.value)
        }
    })
})

variantColors.value.map(color => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == color 
            && !variantColorOptions.value.find(x => x.value == color)){
                variantColorOptions.value.push({value: color, image: prod.images[0], disabled: false})
            }
        })
    })
})

variantSizes.value.map(size => {
    store.listing.products.map((prod: any) => {
        prod.specifications.map((spec: any) => {
            if(spec.value == size 
            && !variantSizeOptions.value.find(x => x.value == size)){
                variantSizeOptions.value.push({value: size, disabled: false})
            }
        })
    })
})

let product_variant = route.query.v ? store.listing.products.find((x:any) => x.uid == route.query.v) : store.listing.base_variant
selectedVariantColor.value = product_variant.specifications.find((x: any) => x.label == 'Color')?.value
selectedVariantSize.value = product_variant.specifications.find((x: any) => x.label == 'Size')?.value
</script>

<template>
    <v-card color="background">
        <v-card-title class="pt-0 px-0 text-wrap">{{ProductTitle }}</v-card-title>
        <v-card-title class="px-0 font-weight-black text-h5">${{ ProductPrice }}</v-card-title>
        
        <v-card-text class="px-0">
            <v-card-subtitle class="px-0">Description</v-card-subtitle>
            {{ ProductDescription }}
        </v-card-text>
    </v-card>
</template>