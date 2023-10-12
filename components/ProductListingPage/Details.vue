<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const store = useProductListingStore()
</script>

<template>
    <v-card color="background">
        <v-card-title class="pt-0 px-0 text-wrap">{{ store.ProductTitle }}</v-card-title>
        <v-card-title class="px-0 font-weight-black text-h5">${{ store.ProductPrice }}</v-card-title>
        
        <v-card-text class="px-0">
            <v-card-subtitle class="px-0">Description</v-card-subtitle>
            {{ store.ProductDescription }}
        </v-card-text>
    </v-card>
</template>