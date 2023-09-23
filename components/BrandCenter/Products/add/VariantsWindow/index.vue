<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
import { useDisplay } from 'vuetify'
import EditImages from './EditImages.vue'
import EditDescription from './EditDescription.vue';

const dialog = ref<boolean>(false)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const store = useBrandCenterProductListingStore()
const selected =  ref<any[]>([])
const editVariantId = ref<string|number>()
const editComponent = shallowRef()
const editPriceId = ref<number|null>()
const headers = ref<any[]>([
    {
        align: 'start',
        key: 'specifications',
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

const setVariantField = (specs: any[]) => {
    let specValues = specs.map(x => {
        if(x.is_required){
            return x.value
        }
    }).filter(x => x).toString()

    return specValues

}

const previewImages = (images: File[]): string[] => {
    let imgs = images.map((x: File) => (URL.createObjectURL(x)))
    return imgs
}

const editData = (itemId: number, type: 'images'|'description'): void => {
    editVariantId.value = itemId
    if(type === 'images'){
        editComponent.value = EditImages
    }else {
        editComponent.value = EditDescription
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
            <v-card-title>{{ store.productVariants.length }} product variants</v-card-title>
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
                        <td>{{ setVariantField(item.columns.specifications) }}</td>
                        <td>
                            <div class="title-field">
                                <v-text-field
                                    v-model="item.value.title"
                                    bg-color="background"
                                    color="primary-alt"
                                    density="compact"
                                    placeholder="Enter product title"
                                    hide-details
                                    variant="underlined"
                                    :rules="[ 
                                        (v: any) => !! v || 'Title is required',
                                        (v: any) => v.length <= 90 || 'Must be 90 characters or less', 
                                    ]"
                                ></v-text-field>
                            </div>
                        </td>
                        <td>
                            <v-btn 
                                @click="editData(item.value.id, 'description')"
                                size="small" 
                                color="primary-alt" 
                                variant="tonal"
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
                                    v-model="item.value.price"
                                    bg-color="background"
                                    class="price-field"
                                    color="primary-alt"
                                    density="compact"
                                    hide-details
                                    variant="underlined"
                                    
                                    :rules="[ 
                                        (v: any) => !! v || 'Price is required',
                                        (v: any) => v >= 500 || 'Minimum price is $5.00'
                                    ]"
                                ></v-text-field>
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
                            <div class="title-field">
                                <v-text-field
                                    v-model="item.value.sku"
                                    bg-color="background"
                                    color="primary-alt"
                                    density="compact"
                                    placeholder="SKU(optional)"
                                    hide-details
                                    variant="underlined"
                                ></v-text-field>
                            </div>
                        </td>
                        <td>
                            <v-btn size="small" color="primary-alt" variant="tonal">
                                <v-icon class="mr-2" icon="mdi-pencil"/>
                                Specifications
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
    <v-dialog
        v-model="dialog"
        data-test-id="auth" 
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
                    />
                    <v-btn 
                        @click="dialog = false"
                        color="primary-alt" 
                        class="ml-auto mt-4" 
                        variant="tonal" 
                        rounded="pill"
                        block
                    >
                        Done
                    </v-btn>
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
    width: 207px;
}
.price-field {
    width: 80px;
}
.quantity-field {
    width: 60px;
}
</style>