<script lang="ts" setup>
import { useProductListingPageStore } from '@/store'

const store = useProductListingPageStore()
</script>

<template>
    <v-container  class="px-sm-8" fluid>
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