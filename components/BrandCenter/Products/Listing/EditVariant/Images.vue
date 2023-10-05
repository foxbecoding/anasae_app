<script lang="ts" setup>
import { Product } from '@/utils/types'
import {useBrandCenterProductListingStore, useSnackbarStore } from '@/store'

const props = defineProps(['product'])
const emit = defineEmits<{
  save: [status: boolean] 
}>()

const config = useRuntimeConfig()
const productListingStore = useBrandCenterProductListingStore()
const fileRef = ref()
const product = ref<Product>(props.product)
const images = ref<File[]>([])
const isSubmitting = ref<boolean>(false)

const UploadedCount = computed(() => product.value.images.length)
const RemainingUploads = computed(() => productListingStore.imgFilesMax - UploadedCount.value)

const previewImages = (imageFiles: File[])  => {
    let images = imageFiles.map((x: any) => (URL.createObjectURL(x)))
    return images
}

const remove = (i: number) => images.value = [...images.value.filter(x => x != images.value[i])]
const removeAll = () => images.value = []

const setImages = (imageFiles: File[]): void => {
    imageFiles.map((x: File) => {
        images.value.push(x)
        images.value = images.value.splice(0, RemainingUploads.value)
    })
}

const Variant = computed(() => `${props.product.color},${props.product.size}`)

const save = async (): Promise<void> => {
    isSubmitting.value = true
    let formData = new FormData
    images.value.map(x => formData.append('images', x))
    formData.append('product', String(product.value.pk))
    
    const { data, error, status } = await useApi({
        method: 'POST', 
        path: `${config.public.API_PRODUCT_IMAGE}`, 
        data: formData,
        isMultiPart: true
    })

    if(status.value == 'error'){
        isSubmitting.value = false
        console.log(error.value)
        return status.value
    }
    emit('save', true)
    isSubmitting.value = false
    useSnackbarStore().setSnackbar('Images updated', true)
}

const deleteImg = async (image: any): Promise<void> => {
    const { data, error, status } = await useApi({
        method: 'DELETE', 
        path: `${config.public.API_PRODUCT_IMAGE}${image.pk}`
    })
    product.value.images = [...product.value.images.filter(x => x.pk != image.pk)]
    useSnackbarStore().setSnackbar('Image deleted', true)
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
    <v-card-title class="pl-0 text-wrap">Edit Images</v-card-title>
    <v-card-subtitle class="pl-0 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <v-card-subtitle class="pl-0 text-wrap">
        Max {{ productListingStore.imgFilesMax }} 
        images: {{ UploadedCount }} 
        of {{ productListingStore.imgFilesMax }} images uploaded
    </v-card-subtitle>
    <v-card-subtitle class="pl-0 text-wrap">Recommended image size: 1200 x 1200</v-card-subtitle>
    <v-card-title class="pl-0 text-wrap">
        Current uploaded images
    </v-card-title>
    <div class="d-flex flex-wrap " >
        <div
            class="bg-surface-el rounded mr-2 mb-2"
            style="height: 100px; width: 100px" 
            v-for="(src, i) in product.images"
            :key="i"
        >
            <v-img :src="config.public.CDN_URL+src.image" class="rounded">
                <v-btn 
                    @click="deleteImg(src)"
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
    <v-card-title class="pl-0 text-wrap">
        New uploaded images: Remaining({{RemainingUploads - images.length}})
    </v-card-title>
    <div class="d-flex flex-wrap mt-4" >
        <div
            class="bg-surface-el rounded mr-2 mb-2"
            style="height: 100px; width: 100px" 
            v-for="(img, i) in previewImages(images)"
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
        class="my-4 mr-2"
        size="small"
        flat 
        rounded="lg"
    >
        Remove all
    </v-btn>
    <v-btn 
        @click="images.length < RemainingUploads ? fileRef.click() : false"
        color="primary-alt" 
        size="small"
        flat 
        rounded="lg"
        :disabled="images.length >= RemainingUploads"
    >
        Add Image(s)
    </v-btn>
    <v-btn 
        @click="save"
        color="primary" 
        class="ml-auto mt-4" 
        rounded="pill"
        block
        :loading="isSubmitting"
        :disabled="images.length === 0"
    >
        Save
    </v-btn>
</template>