<script lang="ts" setup>

const config = useRuntimeConfig()
const route = useRoute()
const selected =  ref<any[]>([])
const search =  ref<string>('')
const productListing = ref<any>()
const filteredProducts = ref([])
const headers = ref<any[]>([
    { key: 'title', title: 'Title', align: 'start' },
    { key: 'color', title: 'Color'},
    { key: 'size', title: 'Size'},
    { key: 'description', title: 'Description' },
    { key: 'images', title: 'Images' },
    { key: 'price_int', title: 'Price' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'sku', title: 'Sku' },
    { key: 'dimensions', title: 'Dimensions' },
    { key: 'specifications', title: 'Specifications' },
    { key: 'stock_status', title: 'Stock status' },
    { key: 'created', title: 'Created' },
    { key: 'updated', title: 'Updated' }
])

const {data: cacheProducts} = await useNuxtData(`${config.public.API_PRODUCT_LISTING}${route.params.lid}/`)
if(cacheProducts.value) productListing.value = cacheProducts.value

const {data} = await useApi({
    method: 'GET', 
    path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
    key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
})

productListing.value = data.value

const Products = computed(() => {
    if(filteredProducts.value.length == 0) return productListing.value['active_products']
    return filteredProducts.value
})

const setDate = (_date: Date) => {
    var date = new Date(_date);
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    var dateFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: `${tz}`
    });
    return dateFormat.format(date);
}

const customFilter = (query: any) => {
    let pks: string[] = []
    filteredProducts.value = productListing.value['active_products'].filter((x: any) => {
        query = String(query).toLowerCase()
        let color = String(x.color).toLowerCase()
        let size = String(x.size).toLowerCase()
        if((color.includes(query) 
        || size.includes(query))
        ){
            return x
        }
    })
}

</script>

<template>
    <v-card color="background" rounded="lg" border>
        <v-card-title class="text-wrap">
            Manage listing products
        </v-card-title>
        <v-card-subtitle class="text-wrap">
            Listing ID: {{ route.params.lid }}<br>
            Category: {{ productListing.category }}
        </v-card-subtitle>
        <div class="d-sm-flex pa-4 align-center justify-space-around">
            <v-btn 
                color="primary-alt" 
                rounded="lg"
                class="mb-4 mb-sm-0"
                :to="{name: 'brand-center-product-listings-add-product-listing'}"
            >
                Add product
            </v-btn>
            <v-spacer />
            <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Filter products"
                variant="solo"
                single-line
                bg-color="surface-el"
                hide-details
                @update:model-value="(e:any) => customFilter(e)"
                flat
                rounded="lg"
            />
        </div>
        
        <v-divider />
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="Products"
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
                    <td><div class="td-title">{{ item.columns.title }}</div></td>
                    <td>{{ item.columns.color }}</td>
                    <td>{{ item.columns.size }}</td>
                    <td>
                        <v-btn 
                            color="primary-alt"
                            variant="tonal"
                            size="small"
                        >
                            <v-icon class="mr-2" icon="mdi-pencil" />
                            Description
                        </v-btn>
                    </td>
                    <td>
                        <div class="d-flex justify-space-between align-center">
                            <v-btn 
                                color="primary"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <div 
                                v-for="(img, i) in item.columns.images"
                                :key="i"
                                class="image-wrapper bg-surface-el ml-1"
                            >
                                <v-img :src="config.public.CDN_URL+img.image"/>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <v-btn 
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon icon="mdi-pencil"  />
                            </v-btn>
                            <span>
                                ${{ item.value.price.price/100 }}
                            </span>
                        </div>
                    </td>
                    <td>{{ item.columns.quantity }}</td>
                    <td>
                        <v-btn 
                            color="primary-alt" 
                            size="small"
                            variant="tonal"
                        >
                            <v-icon icon="mdi-plus-circle-outline" class="mr-2"/>
                            Add Sku
                        </v-btn>
                    </td>
                    <td>
                        <v-btn 
                            size="small" 
                            color="primary-alt" 
                            variant="tonal"
                            flat
                        >
                            <v-icon class="mr-2" icon="mdi-pencil"/>
                            Dimensions
                        </v-btn>
                    </td>
                    <td>
                        <v-btn 
                            size="small" 
                            color="primary-alt" 
                            variant="tonal"
                            flat
                        >
                            <v-icon class="mr-2" icon="mdi-pencil"/>
                            Specifications
                        </v-btn>
                    </td>
                    <td>{{ item.columns.stock_status }}</td>
                    <td>{{ setDate(item.columns.created) }}</td>
                    <td>{{ setDate(item.columns.updated) }}</td>
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

.td-title {
    width: 300px
}
.td-lid {
    width: 120px
}
</style>