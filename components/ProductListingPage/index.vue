<script lang="ts" setup>
import { useProductListingPageStore } from '@/store'

const store = useProductListingPageStore()
</script>

<template>
    <v-container class="px-0 px-sm-8" fluid>
        <v-row>
            <v-col cols="12" sm="6">
                <ProductListingPageImageViewer />
            </v-col>
            <v-col cols="12" sm="6">
                <ProductListingPageDetails class="px-4 px-sm-0" />
            </v-col>
        </v-row>
    </v-container>
</template>