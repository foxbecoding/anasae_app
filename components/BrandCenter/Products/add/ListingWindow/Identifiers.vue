<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'
import { FormTextField } from '@/utils/types'

const store = useBrandCenterProductStore()
const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'Sku(optional)', 
        model: store.formData.sku, 
        name:'sku', 
        type: 'text', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 2, 
        inputType: 'TEXTFIELD',
        label: 'ISBN(optional only for books)', 
        model: store.formData.sku, 
        name:'isbn', 
        type: 'text', 
        variant: 'solo',
    },
])

</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Identifiers</v-card-title>
        <v-card-text class="px-0">
            <FormFields
                :store="store.formData"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>