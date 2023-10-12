<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const store = useProductListingStore()
</script>

<template>
    <v-container class="px-sm-8" fluid>
        <v-row>
            <v-col cols="6">
                <ProductListingPageImageViewer />
            </v-col>
            <v-col cols="6">
                <ProductListingPageDetails />
            </v-col>
        </v-row>
    </v-container>
</template>