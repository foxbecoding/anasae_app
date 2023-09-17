<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'
import { FormTextField, FormButton } from '@/utils/types'

const store = useBrandCenterProductStore()
const fields = ref<FormTextField[]>([
    {
        id: 1, 
        model: store.formData.title, 
        name:'title', 
        label: 'Title', 
        density: 'comfortable',
        color: 'primary',
        bgColor: 'form-field-flat',
        flat: true,
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        rules: [
            (v: any) => !! v || 'Product title is required'
        ],
    },
    {
        id: 2, 
        model: store.formData.description, 
        name:'description', 
        label: 'Description', 
        density: 'comfortable',
        color: 'primary',
        bgColor: 'form-field-flat',
        flat: true,
        type:'password', 
        errorMessages: '',
        inputType: 'TEXTAREA',
        variant: 'solo',
        prependInnerIcon: 'mdi-lock',
        appendInnerIcon: 'mdi-eye',
        appendInnerIconColor: 'primary-alt',
        appendInnerIconFunction: function(){
            if(this.appendInnerIcon == 'mdi-eye'){
                this.appendInnerIcon = 'mdi-eye-off'
                this.type = 'text'
            }else{
                this.appendInnerIcon = 'mdi-eye'
                this.type = 'password'
            }
        },
        rules: [ (v: any) => !! v || 'Password is required' ],
    }
])
</script>

<template>
    <v-card color="background" max-width="500">
        <v-card-title class="px-0">Product details</v-card-title>
        <v-card-text class="px-0">
            <FormFields
                :store="store.formData"
                :fields="fields"
            />
        </v-card-text>
    </v-card>
</template>