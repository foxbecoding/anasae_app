<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductStore } from '@/store'

const store = useBrandCenterProductStore()
const currentImg = ref()
const setPrice = (price: number) => price/100

const setImg = (img: any) => currentImg.value = img

currentImg.value = store.previewImages[0]
</script>

<template>
    <h1 class="text-h5 text-sm-h4 px-6">Confirm product listing</h1>
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
                    <v-card-title class="pt-0 px-0 text-wrap">{{ store.listingDetails.title }}</v-card-title>
                    <v-card-title class="px-0">${{store.listingDetails.price ? setPrice(store.listingDetails.price) : '' }}</v-card-title>
                    <v-card-text class="px-0">
                        {{ store.listingDetails.description }}<br>
                        <section 
                            v-if="store.requiredProductSpecs.length > 0"
                            class="py-4"
                        >
                            <span v-for="(spec, i) in store.requiredProductSpecs">
                                {{ spec.label }}: {{ spec.value.toLowerCase() }}<br>
                            </span>
                        </section>
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

</style>