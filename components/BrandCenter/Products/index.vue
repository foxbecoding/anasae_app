<script lang="ts" setup>
import { Product } from '@/utils/types'

const config = useRuntimeConfig()
const selected =  ref<any[]>([])
const search =  ref<string>('')
const productListings = ref([])
const headers = ref<any[]>([
    { key: 'image', title: 'Image', align: 'start', },
    { key: 'title', title: 'Title' },
    { key: 'uid', title: 'Listing ID' },
    { key: 'active_products', title: 'Active Products' },
    { key: 'inactive_products', title: 'Inactive Products' },
    { key: 'created', title: 'Created' },
    { key: 'updated', title: 'Updated' },
    {key: 'actions', title: 'Actions'}
])

const {data: cacheProducts} = await useNuxtData(`${config.public.API_PRODUCT_LISTING}`)
if(cacheProducts.value) productListings.value = cacheProducts.value

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_PRODUCT_LISTING}`,
    key: `${config.public.API_PRODUCT_LISTING}`
})

productListings.value = data.value

const setDate = (_date: Date) => {
    var date = new Date(_date);
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    var dateFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: `${tz}`
    });
    return dateFormat.format(date);
}
</script>

<template>
    <v-card color="background" rounded="lg" border>
        <v-card-title>
            Manage product listings
        </v-card-title>
        <div class="d-sm-flex pa-4 align-center justify-space-around">
            <v-btn 
                color="primary-alt" 
                rounded="lg"
                class="mb-4 mb-sm-0"
                :to="{name: 'brand-center-product-listings-add-product-listing'}"
            >
                Add product listing
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
            :items="productListings"
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
                                v-show="column.key == 'data-table-select'"
                                @click="selectAll(!allSelected)"
                                color="primary-alt"
                                :model-value="allSelected"
                                :indeterminate="someSelected && !allSelected"
                            ></v-checkbox-btn>
                            <span>{{ column.title }}</span>
                        </td>
                    </template>
                </tr>
                <v-divider class="w-100" style="position: absolute"/>
            </template>
            <template  v-slot:item="{ item, toggleSelect, isSelected }">
                <tr>
                    <td class="py-4">
                        <v-checkbox-btn 
                            color="primary-alt"
                            :model-value="isSelected(item)"
                            @click="toggleSelect(item)"

                        ></v-checkbox-btn>
                    </td> 
                    <td>
                        <div 
                            class="image-wrapper bg-surface-el"
                        >
                            <v-img :src="config.public.CDN_URL+item.columns.image"/>
                        </div>
                    </td>
                    <td><div class="td-title">{{ item.columns.title }}</div></td>
                    <td><div class="td-lid">{{ item.columns.uid }}</div></td>
                    <td><div>{{ item.columns.active_products }}</div></td>
                    <td><div>{{ item.columns.inactive_products }}</div></td>
                    <td><div>{{ setDate(item.columns.created) }}</div></td>
                    <td><div>{{ setDate(item.columns.updated) }}</div></td>
                    <td>
                        <v-btn 
                                color="primary-alt" 
                                variant="tonal" 
                                size="small" 
                                flat
                                text="Manage products"
                            />
                        </td>
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
    width: 50px;
    height: 50px;
}

.td-title {
    width: 300px
}
.td-lid {
    width: 120px
}
</style>