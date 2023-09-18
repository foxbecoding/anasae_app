<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'
import { FormTextField, FormSelectField } from '@/utils/types'

const store = useBrandCenterProductStore()
const quantity = shallowRef([ ...Array(50).keys() ].map( i => i+1))
const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        hint: 'Whole numbers only, Exp: (1000 = $10.00) or (2999 = $29.99). Minimum $5.00',
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'Price', 
        model: store.formData.price || 599, 
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
        model: store.formData.quantity,
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
                :store="store.formData"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>