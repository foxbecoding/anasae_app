<script lang="ts" setup>
import EditVariantDescription from './EditVariant/Description.vue'
import EditVariantImages from './EditVariant/Images.vue'
import EditVariantDimensions from './EditVariant/Dimensions.vue'
import EditVariantSpecifications from './EditVariant/Specifications.vue'
import { useBrandCenterProductListingStore, useSnackbarStore } from "@/store"
import { numbersOnly } from '@/utils/helpers'
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
const editPricePk = ref()
const editPriceModel = ref()
const editPriceFormValid = ref<boolean>(true)
const isSavingPrice = ref<boolean>(false)
const editSkuPk = ref()
const editSkuModel = ref()
const isSavingSku = ref<boolean>(false)
const editQuantityPk = ref()
const editQuantityModel = ref()
const isSavingQuantity = ref<boolean>(false)
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
    { key: 'created', title: 'Created' }
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

const editTitleHandler = (item: any) => {
    if(editTitlePk.value != item.pk){
        editTitleModel.value = item.title
        editTitlePk.value = item.pk
    }else{
        editTitlePk.value = null
        editTitleModel.value = ''
    }
} 

const saveTitleModel = async (product: any): Promise<void> => {
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
    snackbarStore.setSnackbar('Product title updated', true)
}

const editPriceHandler = (item: any) => {
    if(editPricePk.value != item.pk){
        editPriceModel.value = item.price.price
        editPricePk.value = item.pk
    }else{
        editPricePk.value = null
        editPriceModel.value = null
    }
} 

const savePriceModel = async (product: any): Promise<void> => {
    isSavingPrice.value = true

    await useApi({
        method: 'PUT', 
        path: `${config.public.API_PRODUCT_PRICE}${product.price.pk}/`,
        data: {
            price: editPriceModel.value,
            product: product.pk
        }
    })

    const {data: updatedListing} = await useApi({
        method: 'GET', 
        path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
        key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
    })

    productListing.value = updatedListing.value
    isSavingPrice.value = false
    editPricePk.value = null
    editPriceModel.value = null
    snackbarStore.setSnackbar('Product price updated', true)
}

const editSkuHandler = (item: any) => {
    if(editSkuPk.value != item.pk){
        editSkuModel.value = item.sku
        editSkuPk.value = item.pk
    }else{
        editSkuPk.value = null
        editSkuModel.value = ''
    }
} 

const saveSkuModel = async (product: any): Promise<void> => {
    isSavingSku.value = true

    await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT}${product.pk}/`,
        data: {sku: editSkuModel.value}
    })

    const {data: updatedListing} = await useApi({
        method: 'GET', 
        path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
        key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
    })

    productListing.value = updatedListing.value
    isSavingSku.value = false
    editSkuPk.value = null
    editSkuModel.value = null
    snackbarStore.setSnackbar('Product sku updated', true)
}

const editQuantityHandler = (item: any) => {
    if(editQuantityPk.value != item.pk){
        editQuantityModel.value = item.quantity
        editQuantityPk.value = item.pk
    }else{
        editQuantityPk.value = null
        editQuantityModel.value = ''
    }
} 

const saveQuantityModel = async (product: any): Promise<void> => {
    isSavingQuantity.value = true

    await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT}${product.pk}/`,
        data: {quantity: editQuantityModel.value}
    })

    const {data: updatedListing} = await useApi({
        method: 'GET', 
        path: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`,
        key: `${config.public.API_PRODUCT_LISTING}${route.params.lid}/`
    })

    productListing.value = updatedListing.value
    isSavingQuantity.value = false
    editQuantityPk.value = null
    editQuantityModel.value = null
    snackbarStore.setSnackbar('Product quantity updated', true)
}

const openEditDialog = (component: any, product: any) => {
    dialog.value = true
    selectedEditProduct.value = product
    editComponent.value = component
}

const saveEditDialog = async (): Promise<void> => {
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
                                @click="editTitleHandler(item.value)"
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
                            @click="openEditDialog(EditVariantDescription, item.value)"
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
                                @click="openEditDialog(EditVariantImages, item.value)"
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
                                @click="editPriceHandler(item.value)"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editPricePk != item.value.pk ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <span v-if="editPricePk != item.value.pk">
                                ${{ item.value.price.price/100 }}
                            </span>
                            <v-form
                                v-model="editPriceFormValid"
                                @submit="false"
                                v-else 
                            >
                                <v-text-field
                                    @keypress="numbersOnly($event)"
                                    v-model="editPriceModel"
                                    bg-color="background"
                                    class="td-price"
                                    placeholder="Enter price"
                                    hint='Exp: 500 = $5.00'
                                    persistentHint
                                    color="primary-alt"
                                    density="compact"
                                    variant="underlined"
                                    :rules="[ 
                                        (v: any) => !! v || 'Price is required',
                                        (v: any) => v >= 500 || 'Minimum price is $5.00'
                                    ]"
                                />
                            </v-form>
                            
                            <v-btn 
                                v-show="editPricePk == item.value.pk"
                                @click="editPriceFormValid ? savePriceModel(item.value) : false"
                                color="primary-alt"
                                variant="tonal"
                                class="ml-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                                :disabled="!editPriceFormValid"
                                :loading="isSavingPrice"
                            > 
                                <v-icon icon="mdi-content-save-outline" />
                            </v-btn>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-center" >
                            <v-btn 
                                @click="editQuantityHandler(item.value)"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editQuantityPk != item.value.pk ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <span v-if="editQuantityPk != item.value.pk">
                                {{ item.value.quantity }}
                            </span>
                            <v-form @submit="false" v-else>
                                <v-select
                                    v-model="editQuantityModel"
                                    bg-color="background"
                                    color="primary-alt"
                                    class="td-quantity"
                                    :items="productLisitngStore.quantityLimit"
                                    placeholder="Select quantity"
                                    density="compact"
                                    variant="underlined"
                                />
                            </v-form>
                            <v-btn 
                                v-show="editQuantityPk == item.value.pk"
                                @click="saveQuantityModel(item.value)"
                                color="primary-alt"
                                variant="tonal"
                                class="ml-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                                :loading="(editQuantityPk == item.value.pk) && isSavingQuantity"
                            > 
                                <v-icon icon="mdi-content-save-outline" />
                            </v-btn>
                        </div>
                    </td>
                    <td>
                        <div 
                            class="d-flex align-center"
                        >
                            <v-btn 
                                @click="editSkuHandler(item.value)"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editSkuPk != item.value.pk ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <span v-if="editSkuPk != item.value.pk">
                                {{ item.value.sku ? item.value.sku : 'no entry' }}
                            </span>
                            <v-form
                                @submit="false"
                                v-else 
                            >
                                <v-text-field
                                    v-model="editSkuModel"
                                    bg-color="background"
                                    color="primary-alt"
                                    class="td-sku"
                                    placeholder="Enter sku"
                                    density="compact"
                                    variant="underlined"
                                />
                            </v-form>
                            <v-btn 
                                v-show="editSkuPk == item.value.pk"
                                @click="saveSkuModel(item.value)"
                                color="primary-alt"
                                variant="tonal"
                                class="ml-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                                :loading="(editSkuPk == item.value.pk) && isSavingSku"
                            > 
                                <v-icon icon="mdi-content-save-outline" />
                            </v-btn>
                        </div>
                    </td>
                    <td>
                        <v-btn 
                            @click="openEditDialog(EditVariantDimensions, item.value)"
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
                            @click="openEditDialog(EditVariantSpecifications, item.value)"
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
                        @save="saveEditDialog()"
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
.td-price {
    width: 100px;
}
.td-sku {
    width: 120px
}
.td-quantity {
    width: 60px
}
.td-sku {
    width: 120px
}
</style>