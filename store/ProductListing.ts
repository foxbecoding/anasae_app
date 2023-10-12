export const useProductListingStore = defineStore("product-listing-store", () => {
    const listing = ref<any>()
    const currentImg = ref()
    const variantColors = ref<any[]>([])
    const variantSizes = ref<any[]>([])
    const selectedVariantColor = ref()
    const selectedVariantSize = ref()
    const variantColorOptions = ref<{value: string, image: string, disabled: boolean}[]>([])
    const variantSizeOptions = ref<{value: string, disabled: boolean}[]>([])

    const setPrice = (price: number) => price/100
    const setImg = (img: any) => currentImg.value = img

    const CurrentVariant = computed(() => {
        let variant = listing.value.products.filter((x:any) => String(x.variant).toLowerCase() == [selectedVariantColor.value, selectedVariantSize.value].toString().toLowerCase())
        return variant[0]
    })

    const setSizes = (color: any = ''): void => {
        let selectedColor = color || selectedVariantColor.value
        let colors: any[] = []
        listing.value.products.map(
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

    const ProductTitle = computed(() => CurrentVariant.value.title )
    const ProductPrice = computed(() => setPrice(CurrentVariant.value.price))
    const ProductDescription = computed(() => CurrentVariant.value.description )
    const ProductImage = computed(() => {
        if(currentImg.value) return currentImg.value
        return CurrentVariant.value.images[0]
    })
    const ProductPreviewImages = computed(() => CurrentVariant.value.images)
    
    watch(selectedVariantColor, (newValue) => {
        currentImg.value = CurrentVariant.value.images[0]
        setSizes(newValue)
    })

    const resetData = () => {
        listing.value = null
        currentImg.value = null
        variantColors.value = []
        variantSizes.value = []
        selectedVariantColor.value = null
        selectedVariantSize.value = null
        variantColorOptions.value = []
        variantSizeOptions.value = []
    }

    return {
        currentImg,
        listing,
        variantColors,
        variantSizes,
        variantColorOptions,
        variantSizeOptions,
        selectedVariantColor,
        selectedVariantSize,
        CurrentVariant,
        ProductDescription,
        ProductImage,
        ProductPreviewImages,
        ProductTitle,
        ProductPrice,
        resetData,
        setSizes,
        setImg
    }
})





if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductListingStore, import.meta.hot));
}