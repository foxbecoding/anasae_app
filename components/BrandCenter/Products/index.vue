<script lang="ts" setup>
import { useSnackbarStore, useBrandCenterProductListingStore } from '@/store'


const config = useRuntimeConfig()
const snackbarStore = useSnackbarStore()
const productLisitngStore = useBrandCenterProductListingStore()
const selected =  ref<any[]>([])
const search =  ref<string>('')
const productListings = ref([])
const editVariantPk = ref()
const selectedVariant = ref()
const editVariantFormValid = ref<boolean>(true)
const isSavingVariant = ref<boolean>(false)
const editTitlePk = ref()
const editTitleModel = ref()
const editTitleFormValid = ref<boolean>(true)
const isSavingTitle = ref<boolean>(false)
const editImagePk = ref()
const editImageDialog = ref<boolean>(false)
const editImageOptions = ref()
const editImageRadios = ref()
const isSavingImage = ref<boolean>(false)
const headers = ref<any[]>([
    { key: 'image', title: 'Cover image', align: 'start', },
    { key: 'title', title: 'Title' },
    { key: 'uid', title: 'Listing ID' },
    { key: 'active_products_list', title: 'Listing default variant' },
    { key: 'category', title: 'Category' },
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


const editImageHandler = (item: any) => {
    editImageRadios.value = item.image
    editImagePk.value = item.pk
    editImageDialog.value = true
    editImageOptions.value = item.base_variant_images
}

const saveImage = async () => {
    isSavingImage.value = true
    let listing: any = productListings.value.find((x: any) => x.pk == editImagePk.value)
    const {data: updatedListings} = await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT_LISTING}${listing['uid']}/`,
        data: {image: editImageRadios.value}
    })
    productListings.value = updatedListings.value
    isSavingImage.value = false
    editImagePk.value = null
    editImageRadios.value = null
    editImageDialog.value = false
    snackbarStore.setSnackbar('Listing cover image updated', true)
}

const editVariantHandler = (itemPk: any) => {
    if(editVariantPk.value != itemPk){
        editVariantPk.value = itemPk
    }else{
        editVariantPk.value = null
        selectedVariant.value = null
    }
} 

const saveVariantModel = async (item: any) => {
    isSavingVariant.value = true
    const {data: updatedListings} = await useApi({
        method: 'PUT', 
        path: `${config.public.API_PRODUCT_LISTING_BASE_VARIANT}${item.pk}/`,
        data: {product: selectedVariant.value}
    })
    productListings.value = updatedListings.value
    isSavingVariant.value = false
    editVariantPk.value = null
    selectedVariant.value = null
    snackbarStore.setSnackbar('Listing default variant updated', true)
}

const editTitleHandler = (itemPk: any) => {
    if(editTitlePk.value != itemPk){
        editTitlePk.value = itemPk
    }else{
        editTitlePk.value = null
        editTitleModel.value = ''
    }
} 

const saveTitleModel = async () => {
    isSavingTitle.value = true
    let listing: any = productListings.value.find((x: any) => x.pk == editTitlePk.value)
    const {data: updatedListings} = await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT_LISTING}${listing['uid']}/`,
        data: {title: editTitleModel.value}
    })
    productListings.value = updatedListings.value
    isSavingTitle.value = false
    editTitlePk.value = null
    editTitleModel.value = null
    snackbarStore.setSnackbar('Listing title updated', true)
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
                @click="productLisitngStore.lid = null"
                :to="{name: 'brand-center-product-listings-add-product-listing'}"
            >
                Add product listing
            </v-btn>
            <v-spacer />
            <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Filter listings"
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
            <template v-if="productListings.length > 0"  v-slot:item="{ item, toggleSelect, isSelected }">
                <tr>
                    <td class="py-4">
                        <v-checkbox-btn 
                            color="primary-alt"
                            :model-value="isSelected(item)"
                            @click="toggleSelect(item)"

                        ></v-checkbox-btn>
                    </td> 
                    <td>
                        <div class="d-flex align-center">
                            <v-btn 
                                @click="editImageHandler(item.value)"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editImagePk != item.value.pk ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <div 
                                class="image-wrapper bg-surface-el"
                            >
                                <v-img :src="config.public.CDN_URL+item.columns.image"/>
                            </div>
                        </div>
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
                                @click="saveTitleModel()"
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
                    <td><div class="td-lid">{{ item.columns.uid }}</div></td>
                    <td>
                        <div 
                            class="d-flex align-center td-variant_default" 
                            :class="editVariantPk == item.value.base_variant['pk'] ? 'td-variant_default--extend' : 'td-variant_default'"
                        >
                            <v-btn 
                                @click="editVariantHandler(item.value.base_variant['pk'])"
                                color="primary"
                                class="mr-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                            > 
                                <v-icon :icon="editVariantPk != item.value.base_variant['pk'] ? 'mdi-pencil' : 'mdi-close'" />
                            </v-btn>
                            <span v-if="editVariantPk != item.value.base_variant['pk']">
                                {{ item.value.base_variant_text }}
                            </span>
                            <v-form
                                class="td-variant_default--extend"
                                v-model="editVariantFormValid"
                                @submit="false"
                                v-else 
                            >
                                <v-select 
                                    v-model="selectedVariant"
                                    bg-color="background"
                                    color="primary-alt"
                                    placeholder="Select variant "
                                    density="compact"
                                    variant="underlined"
                                    :items="item.columns.active_products_list" 
                                    item-title="variants"
                                    item-value="pk"
                                    width="300"
                                    :rules="[ 
                                        (v: any) => !! v || 'Selection is required'
                                    ]"
                                >
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props" :subtitle="item.raw.title">
                                            <template v-slot:prepend>
                                                <v-avatar rounded="sm">
                                                    <v-img 
                                                        :src="config.public.CDN_URL+item.raw.images[0]['image']" 
                                                    />
                                                </v-avatar>
                                            </template>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-form>
                            <v-btn 
                                v-show="editVariantPk == item.value.base_variant['pk']"
                                @click="saveVariantModel(item.value)"
                                color="primary-alt"
                                variant="tonal"
                                class="ml-1"
                                min-width="0px" 
                                min-height="0px"
                                width="30px"
                                height="30px"
                                flat
                                :disabled="!editVariantFormValid"
                                :loading="(editVariantPk == item.value.base_variant['pk']) && isSavingVariant"
                            > 
                                <v-icon icon="mdi-content-save-outline" />
                            </v-btn>
                        </div>
                    </td>
                    <td><div class="td-category">{{ item.columns.category }}</div></td>
                    <td><div>{{ item.columns.active_products }}</div></td>
                    <td><div>{{ item.columns.inactive_products }}</div></td>
                    <td><div>{{ setDate(item.columns.created) }}</div></td>
                    <td><div>{{ setDate(item.columns.updated) }}</div></td>
                    <td>
                        <v-btn 
                            :to="{name: 'brand-center-product-listings-lid', params: {lid: item.columns.uid}}"
                            color="primary-alt" 
                            variant="tonal" 
                            size="small" 
                            flat
                            text="Manage listing"
                        />
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog
        v-model="editImageDialog"
        width="auto"
        max-width="300px"
        @update:model-value="(e:any) => !e ? editImagePk = null : ''"
    >
        <v-card color="background" rounded="xl">
            <v-card-text>
                <v-radio-group v-model="editImageRadios" color="primary-alt">
                    <template v-slot:label>
                        <div class="text-wrap"><strong>Select an image from your default product variant</strong></div>
                    </template>
                    <v-radio 
                        v-for="(img, i) in editImageOptions"
                        :key="i"
                        :value="img"
                        class="mb-2"
                    >
                        <template v-slot:label>
                            <div 
                                class="image-wrapper bg-surface-el"
                            >
                                <v-img :src="config.public.CDN_URL+img"/>
                            </div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </v-card-text>
            <v-card-actions class="ml-auto">
                <v-btn 
                    @click="() => {
                        editImageDialog = false
                        editImagePk = null
                    }" 
                    flat 
                    :loading="isSavingImage"
                    rounded="pill"
                    variant="text"
                    text="Close"
                />
                <v-btn 
                    @click="saveImage()"
                    color="primary-alt" 
                    flat 
                    :loading="isSavingImage"
                    rounded="pill"
                    variant="tonal"
                    text="Save"
                />
            </v-card-actions>
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
    width: 50px;
    height: 50px;
}

.td-title {
    width: 300px
}
.td-variant_default {
    width: 120px
}
.td-variant_default--extend {
    width: 250px
}
.td-lid {
    width: 120px
}
.td-category {
    width: 120px
}
</style>