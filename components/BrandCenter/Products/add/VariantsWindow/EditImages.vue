<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
const props = defineProps({
    id: Number
})

const emit = defineEmits<{
  save: [status: boolean] 
}>()

const store = useBrandCenterProductListingStore()
const fileRef = ref()
const images = ref<File[]>(store.productVariants.filter(x => x.id == props.id)[0].images)

const previewImages = (imageFiles: File[])  => {
    let images = imageFiles.map(x => (URL.createObjectURL(x)))
    return images
}

const remove = (i: number) => images.value = [...images.value.filter(x => x != images.value[i])]
const removeAll = () => images.value = []

const setImages = (imageFiles: File[]): void => {
    imageFiles.map((x: File) => {
        images.value.push(x)
        images.value = images.value.splice(0, store.imgFilesMax)
    })
}

const Variant = computed(() => store.productVariants.filter(x => x.id == props.id)[0].variant)

const save = (): void => {
    store.productVariants.filter(x => x.id == props.id)[0].images = images.value
    store.productVariants.filter(x => x.id == props.id)[0].previewImages = images.value.map(x => URL.createObjectURL(x))
    emit('save', true)
    useSnackbarStore().setSnackbar('Images updated', true)
}

</script>

<template>
    <v-file-input
        @update:model-value="setImages"
        class="d-none" 
        ref="fileRef" 
        accept="image/png, image/jpeg, image/avif"
        multiple
    />
    <v-card-title class="pl-0 text-wrap">Edit Images</v-card-title>
    <v-card-subtitle class="pl-0 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <v-card-subtitle class="pl-0 text-wrap">
        Max {{ store.imgFilesMax }} images: {{ images.length }} of {{ store.imgFilesMax }} images uploaded
    </v-card-subtitle>
    <v-card-subtitle class="pl-0 text-wrap">Recommended image size: 1200 x 1200</v-card-subtitle>
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
        @click="images.length < store.imgFilesMax ? fileRef.click() : false"
        color="primary-alt" 
        size="small"
        flat 
        rounded="lg"
        :disabled="images.length >= store.imgFilesMax"
    >
        Add Image(s)
    </v-btn>
    <v-btn 
        @click="save"
        color="primary" 
        class="ml-auto mt-4" 
        rounded="pill"
        block
    >
        Save
    </v-btn>
</template>