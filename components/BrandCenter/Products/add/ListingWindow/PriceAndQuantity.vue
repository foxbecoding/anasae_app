<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
import { FormTextField, FormSelectField } from '@/utils/types'

const store = useBrandCenterProductListingStore()
const quantity = shallowRef([ ...Array(50).keys() ].map( i => i+1))
const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        hint: 'Exp: (1000 = $10.00) | (2999 = $29.99) | Minimum price $5.00',
        id: 1, 
        inputType: 'TEXTFIELD',
        label: `Price`, 
        model: store.listingDetails.price, 
        name:'price', 
        persistentHint: true,
        isNumbersOnly: true,
        rules: [ 
            (v: any) => !! v || 'Price is required',
            (v: any) => v >= 500 || 'Minimum price is $5.00'
        ],
        type: 'text', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        flat: true, 
        color: "primary",
        density: 'comfortable',
        id: 2, 
        inputType: 'SELECT',
        items: quantity.value,
        label: "Quantity",
        model: store.listingDetails.quantity,
        name: 'quantity',
        returnObject: true,
        rules: [ (v: any) => !! v || 'Quantity is required' ],
        variant: 'solo'
    } as FormSelectField
])


</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Price & quantity</v-card-title>
        <v-card-text class="px-0">
            <FormFields
                :store="store.listingDetails"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>