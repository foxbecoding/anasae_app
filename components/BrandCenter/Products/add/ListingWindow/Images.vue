<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'

const store = useBrandCenterProductStore()
const fileRef = ref()

const setImages = (images: File[]): void => {
    images.map((x: File) => {
        store.previewImages.push(URL.createObjectURL(x))
        store.listingDetails.images.push(x)
        store.previewImages = store.previewImages.splice(0, store.imgFilesMax)
        store.listingDetails.images = store.listingDetails.images.splice(0, store.imgFilesMax)
    })
}

const remove = (i: number): void => {
    store.previewImages = [...store.previewImages.filter(x => x != store.previewImages[i])]
    store.listingDetails.images = [...store.listingDetails.images.filter(x => x != store.listingDetails.images[i])]
}

</script>

<template>
    <v-card color="transparent" >
        <v-card-title class="px-6">Images</v-card-title>
        <v-card-subtitle class="px-6">You can upload up to {{ store.imgFilesMax }} images</v-card-subtitle>
        <v-card-subtitle class="px-6">Recommened image size: 600 x 600</v-card-subtitle>
        <v-card-text class="px-0">
            <v-file-input
                @update:model-value="setImages"
                class="d-none" 
                ref="fileRef" 
                accept="image/png, image/jpeg"
                multiple
            />
            <div class="d-flex images-container px-6">
                <v-btn 
                    @click="store.previewImages.length < store.imgFilesMax ? fileRef.click() : false"
                    color="surface-el" 
                    flat 
                    height="90"
                    width="90"
                    rounded="lg"
                    :disabled="store.previewImages.length >= store.imgFilesMax"
                >
                    {{ store.previewImages.length > 0 ? store.previewImages.length :  '' }}
                    <v-icon size="36">mdi-plus</v-icon>
                </v-btn>
                <div class="d-flex flex-md-wrap">
                    <div
                        v-for="(imgSrc, i) in store.previewImages"
                        :key="i" 
                        class="ml-2 mb-2 image-wrapper bg-surface-el rounded-lg"
                    >
                        <v-img :src="imgSrc" style="position: relative">
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
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.images-container{
    overflow-x: auto;
    position: relative;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    z-index: 1000
}

.images-container::-webkit-scrollbar {
    display: none
}

/* @media screen and (max-width: 959px) {
    .images-container::-webkit-scrollbar {
        display: none;
    }
} */

.image-wrapper {
    width: 90px;
    height: 90px;
    position: relative;
}
</style>