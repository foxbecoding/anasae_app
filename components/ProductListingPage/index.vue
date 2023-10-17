<script lang="ts" setup>
import { useProductListingPageStore } from '@/store'

const store = useProductListingPageStore()
const { ProductVariant } = useProductListingPage()
const currentPanel = ref('description')
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
        <v-expansion-panels 
            v-model="currentPanel"
            variant="accordion" 
            class="elevation-none"
        >
            <v-expansion-panel
                title="Description"
                value="description"
                :text="ProductVariant.description"
                rounded="lg"
                ripple
            >
            </v-expansion-panel>
            <v-expansion-panel
                title="Specifications"
                value="specifications"
                rounded="lg"
                ripple
            >
                <v-expansion-panel-text>
                    <div class="border py-3" v-for="(spec, s) in ProductVariant.specifications" :key="s">
                        <v-row>
                            <v-col cols="6"><span class="ml-3">{{ spec.label.toUpperCase() }}:</span></v-col>
                            <v-divider vertical />
                            <v-col cols="6">{{ spec.value.toUpperCase() }}</v-col>
                        </v-row>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>