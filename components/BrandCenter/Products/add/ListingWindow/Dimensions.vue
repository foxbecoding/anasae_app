<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'

interface DimRow {
    textModel: string 
    textLabel: string
    textKey: any
    selectModel: string
    selectItems: string[]
    selectKey: any
}

const store = useBrandCenterProductListingStore()

const dimRows = ref<DimRow[]>([
    {
        textModel: store.listingDetails.length, 
        textLabel: 'Length', 
        textKey: 'length',
        selectModel: store.lengthUnit, 
        selectItems: ['in', 'ft'],
        selectKey: 'lengthUnit'
    },
    {
        textModel: store.listingDetails.width, 
        textLabel: 'Width', 
        textKey: 'width',
        selectModel: store.widthUnit, 
        selectItems: ['in', 'ft'],
        selectKey: 'widthUnit'
    },
    {
        textModel: store.listingDetails.height, 
        textLabel: 'Height', 
        textKey: 'height',
        selectModel: store.heightUnit, 
        selectItems: ['in', 'ft'],
        selectKey: 'heightUnit'
    },
    {
        textModel: store.listingDetails.weight, 
        textLabel: 'Weight', 
        textKey: 'weight',
        selectModel: store.weightUnit, 
        selectItems: ['oz', 'lbs'],
        selectKey: 'weightUnit'
    },
])

const textModelUpdate = (e: any, dimRow: DimRow) => {
    store.listingDetails[`${dimRow.textKey}`] = e
}

const selectModelUpdate = (e: any, dimRow: DimRow) => {
    store[`${dimRow.selectKey}`] = e
}

const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9.]+$/.test(char)) return true; 
    else e.preventDefault();
}

</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Dimensions</v-card-title>
        <v-card-subtitle class="px-0 text-wrap">
            Enter the dimensions of the packaging that is used for your product(s).
        </v-card-subtitle>
        <v-card-subtitle class="px-0 text-wrap">
            Ensure that the measurements are as accurate as possible. 
            This is used to calculate shipping charges.
        </v-card-subtitle>
        <v-card-text class="px-0">
            <v-form>
                <v-row
                    v-for="(row, i) in dimRows"
                    :key="i" 
                    no-gutters
                >
                    <v-col 
                        cols="8"
                        sm="9"
                        class="pr-1"
                    >
                        <v-text-field 
                            v-model="row.textModel"
                            @keypress="filterValue"
                            color="primary"
                            bg-color="form-field-flat"
                            :label="row.textLabel" 
                            variant="solo" 
                            flat 
                            @update:model-value="textModelUpdate($event, row)"
                            :rules="[(v: any) => !! v || `${row.textLabel} is required`]"
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="4" 
                        sm="3"
                    >
                        <v-select 
                            v-model="row.selectModel"
                            color="primary"
                            bg-color="form-field-flat"
                            label="Unit" 
                            variant="solo" 
                            flat 
                            @update:model-value="selectModelUpdate($event, row)"
                            :items="row.selectItems"
                        ></v-select>
                    </v-col>
                </v-row>
                
            </v-form>
        </v-card-text>
    </v-card>
</template>