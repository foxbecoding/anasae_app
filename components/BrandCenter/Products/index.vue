<script lang="ts" setup>
import { Product } from '@/utils/types'

const config = useRuntimeConfig()
const selected =  ref<any[]>([])
const search =  ref<string>('')
const products = ref<Product[]>()
const headers = ref<any[]>([
    {
        align: 'start',
        key: 'title',
        title: 'Title',
    },
    { key: 'group_id', title: 'Product group id' },
    { key: 'images', title: 'Images' },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price' },
    { key: 'quantity', title: 'Quantity' },
])

const {data: cacheProducts} = await useNuxtData(`${config.public.API_BRAND_CENTER_PRODUCT}`)
products.value = cacheProducts.value

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_BRAND_CENTER_PRODUCT}`,
    key: `${config.public.API_BRAND_CENTER_PRODUCT}`
})

products.value = data.value

</script>

<template>
    <v-card color="background" rounded="lg" border>
        <v-card-title>
            Manage product inventory
        </v-card-title>
        <div class="d-sm-flex pa-4 align-center justify-space-around">
            <v-btn 
                color="primary-alt" 
                rounded="lg"
                class="mb-4 mb-sm-0"
                :to="{name: 'brand-center-manage-products-add-product-listing'}"
            >
                Add product
            </v-btn>
            <v-spacer />
            <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                variant="solo"
                single-line
                bg-color="surface-el"
                hide-details
                flat
                rounded="lg"
            />
        </div>
        
        <v-divider />
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="products"
            :search="search"
            item-value="pk"
            return-object
            show-select
        >
            <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort, selectAll, someSelected, allSelected }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td class="bg-background">
                            <v-checkbox-btn 
                                v-if="column.key == 'data-table-select'"
                                @click="selectAll(!allSelected)"
                                color="primary-alt"
                                :model-value="allSelected"
                                :indeterminate="someSelected && !allSelected"
                            ></v-checkbox-btn>
                            <span 
                                v-else
                                class="mr-2 cursor-pointer table-head"
                                @click="() => toggleSort(column)"
                            >
                                {{ column.title }}
                            </span>
                            <template v-if="isSorted(column)">
                                <v-icon :icon="getSortIcon(column)"></v-icon>
                            </template>
                        </td>
                    </template>
                </tr>
                <v-divider class="w-100" style="position: absolute"/>
            </template>
            <template v-slot:item="{ item, toggleSelect, isSelected }">
                <tr>
                    <td>
                        <v-checkbox-btn 
                            color="primary-alt"
                            :model-value="isSelected(item)"
                            @click="toggleSelect(item)"

                        ></v-checkbox-btn>
                    </td> 
                    <td>{{ item.columns.title }}</td>
                    <td>{{ item.columns.group_id }}</td>
                    <td>
                        <div class="d-flex justify-space-between align-center">
                            <div 
                                v-for="(img, i) in item.columns.images" 
                                :key="i"
                                class="image-wrapper bg-surface-el mr-1"
                            >
                                <v-img :src="config.public.CDN_URL+img.image"/>
                            </div>
                        </div>
                    </td>
                    <td>{{ item.columns.category.title }}</td>
                    <td>${{ item.columns.price.price/100 }}</td>
                    <td>{{ item.columns.quantity }}</td>
                </tr>
            </template>
        </v-data-table>
  </v-card>
</template>

<style scoped>

.v-table {
    background: rgb(var(--v-theme-background)) !important;
}

.v-table .v-table__wrapper > table tbody > tr > td {
    background: rgb(var(--v-theme-background)) !important;
}

.table-head {
    cursor: pointer
}

.v-table--density-default > .v-table__wrapper > table > thead > tr > th {
    background: rgb(var(--v-theme-background)) !important;
}

.image-wrapper {
    width: 30px;
    height: 30px;
}
</style>