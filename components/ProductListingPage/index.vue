<script lang="ts" setup>
import { useProductListingPageStore } from '@/store'

const store = useProductListingPageStore()
const { ProductVariant } = useProductListingPage()
</script>

<template>
    <v-container class="px-0 px-sm-8" fluid>
        <v-row :no-gutters="$vuetify.display.xs">
            <v-col cols="12" sm="6" >
                <ProductListingPageImageViewer />
            </v-col>
            <v-col cols="12" sm="6">
                <ProductListingPageDetails class="px-4 pt-4 px-sm-0" />
            </v-col>
        </v-row>
    </v-container>
    <v-container fluid>
        <v-card color="bg-surface-el" flat rounded="lg" elevation="0">
            <v-card-title>Description</v-card-title>
            <v-card-text >
                {{ ProductVariant.description }}
            </v-card-text>
        </v-card> 
    </v-container>
</template>