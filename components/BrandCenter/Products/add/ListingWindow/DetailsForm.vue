<script lang="ts" setup>
import { useBrandCenterProductStore, useCategoryStore } from '@/store'
import { FormTextField, FormSelectField } from '@/utils/types'

const store = useBrandCenterProductStore()
const categoryStore = useCategoryStore()
const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        counter: 90,
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'Title', 
        model: store.formData.title, 
        name:'title', 
        rules: [ 
            (v: any) => !! v || 'Title is required',
            (v: any) => v.length <= 90 || 'Must be 90 characters or less', 
        ],
        type: 'text', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        color: 'primary',
        counter: 300,
        density: 'comfortable',
        errorMessages: '',
        flat: true,
        id: 2, 
        inputType: 'TEXTAREA',
        label: 'Description', 
        model: store.formData.description, 
        name:'description', 
        rules: [ 
            (v: any) => !! v || 'Description is required',
            (v: any) => v.length <= 300 || 'Must be 300 characters or less', 
        ],
        type:'password', 
        variant: 'solo',
    },
    {
        bgColor: 'form-field-flat',
        flat: true, 
        color: "primary",
        density: 'comfortable',
        id: 3, 
        inputType: 'SELECT',
        items: categoryStore.categories,
        label: "Category",
        model: store.formData.category,
        name: 'category',
        returnObject: true,
        rules: [ (v: any) => !! v || 'Category is required' ],
        variant: 'solo'
    } as FormSelectField
])

const updatedEmitter = (e: any): void => {
    // console.log(e)
}
</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Details</v-card-title>
        <v-card-text class="px-0">
            <FormFields
                @updated="updatedEmitter"
                :store="store.formData"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>