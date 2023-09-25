<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
import { useDisplay } from 'vuetify'
import EditImages from './EditImages.vue'
import EditDescription from './EditDescription.vue'
import EditSpecifications from './EditSpecifications.vue'
import BulkEdit from './BulkEdit.vue'

const dialog = ref<boolean>(false)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const store = useBrandCenterProductListingStore()
const snackbarStore = useSnackbarStore()
const selected =  ref<any[]>([])
const editVariantId = ref<string|number>()
const editComponent = shallowRef()
const editPriceId = ref<number|null>()
const editPriceModel = ref<any>()
const editTitleId = ref<number|null>()
const editTitleModel = ref<any>()
const editSkuId = ref<number|null>()
const editSkuModel = ref<any>()
const headers = ref<any[]>([
    {
        align: 'start',
        key: 'variant',
        title: 'Variant',
    },
    { key: 'title', title: 'Title' },
    { key: 'description', title: 'Description' },
    { key: 'images', title: 'Images' },
    { key: 'price', title: 'Price' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'sku', title: 'Sku' },
    { key: 'specifications', title: 'Specifications' },
])

const bulkEditDialog = ref<boolean>(false)
const bulkEditDialogForm = ref<boolean>(false)
const bulkEditValues = reactive({
     title: false,
     description: false,
     images: false,
     price: false,
     quantity: false,
     sku: false,
     specifications: false
})

const bulkEditOptions = ref<{model: boolean, label: string}[]>([
    {model: bulkEditValues.title, label: 'Title'},
    {model: bulkEditValues.description, label: 'Description'},
    {model: bulkEditValues.images, label: 'Images'},
    {model: bulkEditValues.price, label: 'Price'},
    {model: bulkEditValues.quantity, label: 'Quantity'},
    {model: bulkEditValues.sku, label: 'Sku'},
    {model: bulkEditValues.specifications, label: 'Specifications'},
])

const activateVariants = (): void => {
    store.selectedVariants = store.productVariants.map((x: any) => {
        if(selected.value.includes(x)){
            x.is_active = true
            return x
        }else{
            x.is_active = false
        }
    }).filter(x => x)
    useSnackbarStore().setSnackbar(`${store.selectedVariants.length} variants activated`, true)
} 

const deactivateVariants = (): void => {
    useSnackbarStore().setSnackbar(`${store.selectedVariants.length} variants deactivated`, true)
    store.selectedVariants = []
}

const previewImages = (images: File[]): string[] => {
    let imgs = images.map((x: File) => (URL.createObjectURL(x)))
    return imgs
}

const saveTitleModel = () => {
    if(!editTitleModel.value){
        store.productVariants.filter(x => x.id == editTitleId.value)[0].title = store.listingDetails.title
    }else{
        store.productVariants.filter(x => x.id == editTitleId.value)[0].title = editTitleModel.value
    }
    snackbarStore.setSnackbar('Title updated', true)
}

const saveSkuModel = () => {
    store.productVariants.filter(x => x.id == editSkuId.value)[0].sku = editSkuModel.value
    snackbarStore.setSnackbar('Sku updated', true)
}

const savePriceModel = () => {
    if(!editPriceModel.value 
    || isNaN(editPriceModel.value)
    ||editPriceModel.value < 500){
        store.productVariants.filter(x => x.id == editPriceId.value)[0].price = store.listingDetails.price
    }else{
        store.productVariants.filter(x => x.id == editPriceId.value)[0].price = editPriceModel.value
        editPriceId.value = null
    }
    snackbarStore.setSnackbar('Price updated', true)
}

const editData = (itemId: number, type: 'images'|'description'|'specifications'): void => {
    editVariantId.value = itemId
    if(type === 'images'){
        editComponent.value = EditImages
    }else if(type === 'description'){
        editComponent.value = EditDescription
    }else{
        editComponent.value = EditSpecifications
    }
    dialog.value = true
}

const numbersOnly = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9]+$/.test(char)) return true; 
    else e.preventDefault();
}


</script>

<template>
    <h1 class="text-h5 text-sm-h4 px-6">Product variants</h1>
    <v-container class="px-6" fluid>
        <v-card color="background" rounded="lg" border>
            <v-card-title class="text-wrap">
                {{ selected.length }} of {{ store.productVariants.length }} 
                    product variants selected 
            </v-card-title>
            <v-card-title class="text-wrap">
                {{ store.selectedVariants.length }} activated variant{{ store.selectedVariants.length > 1 ? 's' :'' }}
            </v-card-title>
            <v-container class="pt-0 ml-0">
                <v-btn 
                    @click="bulkEditDialog = true"
                    class="mr-2 mt-4"
                    color="primary"
                    rounded="pill"
                    size="small"
                    flat
                    :block="useDisplay().xs.value"
                    :disabled="selected.length === 0"
                >
                    Bulk edit({{ selected.length }} variant{{ selected.length > 1 ? 's' : ''}})
                </v-btn>
                <v-btn 
                    @click="activateVariants()"
                    class="text-background mt-4 mr-2"
                    color="primary-alt"
                    rounded="pill"
                    size="small"
                    flat
                    :block="useDisplay().xs.value"
                    :disabled="selected.length === 0"
                >
                    Activate({{ selected.length }} variant{{ selected.length > 1 ? 's' : ''}})
                </v-btn>
                <v-btn 
                    @click="deactivateVariants()"
                    color="error"
                    class="mt-4"
                    rounded="pill"
                    size="small"
                    flat
                    :block="useDisplay().xs.value"
                    :disabled="store.selectedVariants.length === 0"
                >
                    Deactivate({{ store.selectedVariants.length }} variant{{ store.selectedVariants.length > 1 ? 's' :'' }})
                </v-btn>
            </v-container>
            <!-- <section class="px-4 mb-4" >
                <v-btn 
                    color="primary"
                    rounded="pill"
                    size="small"
                    :disabled="store.selectedVariants.length === 0"
                >
                    Bulk edit({{ store.selectedVariants.length }} variants)
                </v-btn>
            </section> -->
            <v-divider />
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="store.productVariants"
                item-value="pk"
                return-object
                show-select
            >
                <template v-slot:headers="{ columns, selectAll, someSelected, allSelected }">
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
                                <span>
                                    {{ column.title }}
                                </span>
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
                        <td>{{ item.columns.variant }}</td>
                        <td>
                            <div class="d-flex align-center title-field">
                                <v-btn 
                                    @click="editTitleId != item.value.id ? editTitleId = item.value.id : editTitleId = null "
                                    color="primary"
                                    class="mr-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon :icon="editTitleId != item.value.id ? 'mdi-pencil' : 'mdi-close'" />
                                </v-btn>
                                <span v-if="editTitleId != item.value.id">
                                    {{ item.value.title }}
                                </span>
                                <v-text-field
                                    v-else
                                    :model-value="item.value.title"
                                    @update:model-value="(e: any) => editTitleModel = e"
                                    bg-color="background"
                                    class="title-field"
                                    color="primary-alt"
                                    placeholder="Enter title"
                                    density="compact"
                                    variant="underlined"
                                    hide-details
                                ></v-text-field>
                                <v-btn 
                                    v-show="editTitleId == item.value.id"
                                    @click="saveTitleModel()"
                                    color="primary-alt"
                                    variant="tonal"
                                    class="ml-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon icon="mdi-content-save-outline" />
                                </v-btn>
                            </div>
                        </td>
                        <td>
                            <v-btn 
                                @click="editData(item.value.id, 'description')"
                                size="small" 
                                color="primary-alt" 
                                variant="tonal"
                                flat
                            >
                                <v-icon class="mr-2" icon="mdi-pencil"/>
                                Description
                            </v-btn>
                        </td>
                        <td>
                            <div class="d-flex  align-center">
                                <v-btn 
                                    @click="editData(item.value.id, 'images')"
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
                                    v-for="(img, i) in previewImages(item.columns.images)" 
                                    :key="i"
                                    class="image-wrapper bg-surface-el ml-1"
                                >
                                    <v-img :src="img"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-center">
                                <v-btn 
                                    @click="editPriceId != item.value.id ? editPriceId = item.value.id : editPriceId = null "
                                    color="primary"
                                    class="mr-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon :icon="editPriceId != item.value.id ? 'mdi-pencil' : 'mdi-close'" />
                                </v-btn>
                                <span v-if="editPriceId != item.value.id">
                                    ${{ item.value.price/100 }}
                                </span>
                                <v-text-field
                                    v-else
                                    @keypress="numbersOnly($event)"
                                    :model-value="item.value.price"
                                    @update:model-value="(e: any) => editPriceModel = e"
                                    bg-color="background"
                                    class="price-field"
                                    placeholder="Enter price"
                                    color="primary-alt"
                                    density="compact"
                                    variant="underlined"
                                    hide-details
                                ></v-text-field>
                                <v-btn 
                                    v-show="editPriceId == item.value.id"
                                    @click="savePriceModel()"
                                    color="primary-alt"
                                    variant="tonal"
                                    class="ml-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon icon="mdi-content-save-outline" />
                                </v-btn>
                            </div>
                        </td>
                        <td>
                            <div class="quantity-field">
                                <v-select
                                    v-model="item.value.quantity"
                                    :items="store.quantityLimit"
                                    color="primary-alt"
                                    variant="underlined"
                                    density="compact"
                                    :rules="[ (v: any) => !! v || 'Quantity is required' ]"
                                    bg-color="background"
                                    hide-details
                                />
                            </div>
                        </td>
                        <td>
                            <v-btn 
                                v-if="!item.value.sku && (editSkuId != item.value.id) "
                                @click="editSkuId = item.value.id"
                                color="primary-alt" 
                                size="small"
                                variant="tonal"
                            >
                                <v-icon icon="mdi-plus-circle-outline" class="mr-2"/>
                                Add Sku
                            </v-btn>
                            <div v-else-if="editSkuId == item.value.id || item.value.sku" class="d-flex align-center sku-field">
                                <v-btn 
                                    @click="editSkuId != item.value.id ? editSkuId = item.value.id : editSkuId = null "
                                    color="primary"
                                    class="mr-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon :icon="editSkuId != item.value.id ? 'mdi-pencil' : 'mdi-close'" />
                                </v-btn>
                                <span v-if="editSkuId != item.value.id">
                                    {{ item.value.sku }}
                                </span>
                                <v-text-field
                                    v-else
                                    :model-value="item.value.sku"
                                    @update:model-value="(e: any) => editSkuModel = e"
                                    bg-color="background"
                                    class="sku-field"
                                    color="primary-alt"
                                    placeholder="Enter sku(optional)"
                                    density="compact"
                                    variant="underlined"
                                    hide-details
                                ></v-text-field>
                                <v-btn 
                                    v-show="editSkuId == item.value.id"
                                    @click="saveSkuModel()"
                                    color="primary-alt"
                                    variant="tonal"
                                    class="ml-1"
                                    min-width="0px" 
                                    min-height="0px"
                                    width="30px"
                                    height="30px"
                                    flat
                                > 
                                    <v-icon icon="mdi-content-save-outline" />
                                </v-btn>
                            </div>
                        </td>
                        <td>
                            <v-btn 
                                @click="editData(item.value.id, 'specifications')"
                                size="small" 
                                color="primary-alt" 
                                variant="tonal"
                                flat
                            >
                                <v-icon class="mr-2" icon="mdi-pencil"/>
                                Specifications
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
    <v-dialog max-width="300px" v-model="bulkEditDialog">
        <v-card
            color="background"
            rounded="xl"
        >
            <v-card-title>Select fields to edit</v-card-title>
            <v-card-text>
                <v-checkbox
                    v-for="(opt, i) in bulkEditOptions"
                    :key="i"
                    v-model="opt.model"
                    color="primary-alt"
                    :label="opt.label"
                    hide-details
                ></v-checkbox>
            </v-card-text>
            <v-card-actions class="ml-auto">
                <v-btn @click="bulkEditDialog = false" variant="plain" flat>Close</v-btn>
                <v-btn color="primary-alt" variant="tonal" flat>Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="bulkEditDialogForm"
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
                    <BulkEdit 
                        :title="bulkEditValues.title" 
                        :description="bulkEditValues.description" 
                        :images="bulkEditValues.images"
                        :price="bulkEditValues.price"
                        :quantity="bulkEditValues.quantity"
                        :sku="bulkEditValues.sku"
                        :specifications="bulkEditValues.specifications"
                    />
                </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
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
                        :id="editVariantId"
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

.title-field {
    width: 306px;
}
.sku-field {
    width: 207px;
}
.price-field {
    width: 80px;
}
.quantity-field {
    width: 60px;
}
</style>