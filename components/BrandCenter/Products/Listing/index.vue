<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from "@/store"
import { useDisplay } from 'vuetify'

const config = useRuntimeConfig()
const route = useRoute()
const snackbarStore = useSnackbarStore()
const productLisitngStore = useBrandCenterProductListingStore()
const dialog = ref<boolean>(false)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const editComponent = shallowRef()
const selectedEditProduct = ref()
const selected =  ref<any[]>([])
const search =  ref<string>('')
const editTitlePk = ref()
const editTitleModel = ref()
const editTitleFormValid = ref<boolean>(true)
const isSavingTitle = ref<boolean>(false)
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

const editTitleHandler = (itemPk: any) => {
    if(editTitlePk.value != itemPk){
        editTitlePk.value = itemPk
    }else{
        editTitlePk.value = null
        editTitleModel.value = ''
    }
} 

const saveTitleModel = async (product: any) => {
    isSavingTitle.value = true

    await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT}${product.pk}/`,
        data: {title: editTitleModel.value}
    })

    const {data: updatedListing} = await useApi({
        method: 'GET', 
        path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
        key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
    })

    productListing.value = updatedListing.value
    isSavingTitle.value = false
    editTitlePk.value = null
    editTitleModel.value = null
    snackbarStore.setSnackbar('Listing title updated', true)
}

const openEditDialog = (component: any) => {
    dialog.value = true
    editComponent.value = component
}

const saveEditDialog = async () => {
    dialog.value = false
    const {data: updatedListing} = await useApi({
        method: 'GET', 
        path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
        key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
    })

    productListing.value = updatedListing.value
}

const setDate = (_date: Date) => {
    var date = new Date(_date);
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    var dateFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: `${tz}`
    });
    return dateFormat.format(date);
}

const customFilter = (query: any) => {
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
    <v-card v-if="productListing" color="background" rounded="lg" border>
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
                @click="productLisitngStore.lid = $route.params.lid"
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
                    <td>
                        <div class="d-flex align-center td-title">
                            <v-btn 
                                @click="editTitleHandler(item.value.pk)"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editTitlePk != item.value.pk ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <span v-if="editTitlePk != item.value.pk">
                                {{ item.value.title }}
                            </span>
                            <v-form
                                class="td-title" 
                                v-model="editTitleFormValid"
                                @submit="false"
                                v-else 
                            >
                                <v-text-field
                                    v-model="editTitleModel"
                                    bg-color="background"
                                    color="primary-alt"
                                    placeholder="Enter title"
                                    density="compact"
                                    variant="underlined"
                                    :counter="90"
                                    :rules="[ 
                                        (v: any) => !! v || 'Title is required',
                                        (v: any) => v.length <= 90 || 'Must be 90 characters or less', 
                                    ]"
                                />
                            </v-form>
                            <v-btn 
                                v-show="editTitlePk == item.value.pk"
                                @click="saveTitleModel(item.value)"
                                color="primary-alt"
                                variant="tonal"
                                class="ml-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                                :disabled="!editTitleFormValid"
                                :loading="(editTitlePk == item.value.pk) && isSavingTitle"
                            > 
                                <v-icon icon="mdi-content-save-outline" />
                            </v-btn>
                        </div>
                    </td>
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
    <v-dialog
        v-model="dialog"
        :fullscreen="IsFullscreen"
        :width="IsFullscreen ? '600px': '500px'"
        :transition="IsFullscreen ? 'dialog-bottom-transition' : 'fade-transition'"
        persistent
    >
        <v-card 
            height="1000px" 
            color="background"
            :rounded="IsFullscreen ? 'none' : 'xl'"
            :class="IsFullscreen ? 'mobile-dialog-card' : ''"
        >
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn 
                        @click="dialog = false"
                        color="transparent" 
                        size="small" 
                        icon
                    >
                        <v-icon icon="mdi-close" />
                    </v-btn> 
                    
                    <div class="auth-form-logo-container w-100 mr-4"> 
                        <Logo /> 
                    </div>
                </div>
                <v-card-text>
                    <component 
                        :is="editComponent" 
                        :product="selectedEditProduct"
                        @save="dialog = false"
                    />
                </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
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