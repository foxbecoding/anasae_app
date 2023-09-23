<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
const props = defineProps({
    id: Number
})

const store = useBrandCenterProductListingStore()
const fileRef = ref()

const Images = computed(() => store.productVariants.filter(x => x.id == props.id)[0].images)

const previewImages = (images: File[])  => {
    let imgs = images.map(x => (URL.createObjectURL(x)))
    return imgs
}

const remove = (i: number): void => {
    let variantImages = store.productVariants.filter(x => x.id == props.id)[0].images
    store.productVariants.filter(x => x.id == props.id)[0].images = [...variantImages.filter(x => x != variantImages[i])]
}

const removeAll = (): void => {
    store.productVariants.filter(x => x.id == props.id)[0].images = []
}

const setImages = (images: File[]): void => {
    images.map((x: File) => {
        store.productVariants.filter(x => x.id == props.id)[0].images.push(x)
        store.productVariants.filter(x => x.id == props.id)[0].images = store.productVariants.filter(x => x.id == props.id)[0].images.splice(0, store.imgFilesMax)
    })
}

const setVariantField = (specs: any[]) => {
    let specValues = specs.map(x => {
        if(x.is_required){
            return x.value
        }
    }).filter(x => x).toString()

    return specValues

}

</script>

<template>
    <v-file-input
        @update:model-value="setImages"
        class="d-none" 
        ref="fileRef" 
        accept="image/png, image/jpeg"
        multiple
    />
    <h3 class="mb-4">Variant: {{ setVariantField(store.productVariants.filter(x => x.id == props.id)[0].specifications) }}</h3>
    <div class="d-flex flex-wrap" >
        <div
            class="bg-surface-el rounded mr-2 mb-2"
            style="height: 100px; width: 100px" 
            v-for="(img, i) in previewImages(Images)"
            :key="i"
        >
            <v-img :src="img" class="rounded">
                <v-btn 
                    @click="remove(i)"
                    color="error" 
                    variant="text" 
                    size="x-small" 
                    icon 
                    flat
                >
                    <v-icon size="large">mdi-delete</v-icon>
                </v-btn>
            </v-img>
        </div>
    </div>
    <v-btn 
        @click="removeAll()"
        color="error" 
        class="my-4"
        flat 
        rounded="pill"
        block
    >
        Remove all images
    </v-btn>
    <v-btn 
        @click="Images.length < store.imgFilesMax ? fileRef.click() : false"
        color="primary" 
        flat 
        rounded="pill"
        block
        :disabled="Images.length >= store.imgFilesMax"
    >
        Add Image(s){{ Images.length }}
    </v-btn>
</template>