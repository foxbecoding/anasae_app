<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'

const store = useBrandCenterProductStore()
const fileRef = ref()
const fileModel = ref()
// watch(brandLogoFile, (newFile) => { uploadImage(newFile[0]) })

</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Images</v-card-title>
        <v-card-subtitle class="px-0">You can upload up to 7 images</v-card-subtitle>
        <v-card-subtitle class="px-0">Recommened image size: 600 x 600</v-card-subtitle>
        <v-card-text class="px-0">
            <v-file-input
                v-model="fileModel" 
                class="d-none" 
                ref="fileRef" 
                accept="image/png, image/jpeg"
                multiple
            />
            <v-btn 
                @click="fileRef.click()"
                color="surface-el" 
                flat 
                height="90"
                width="90"
                rounded="lg"
            >
                <v-icon size="36">mdi-plus</v-icon>
            </v-btn>
        </v-card-text>
    </v-card>
</template>