<script lang="ts" setup>
import { UserMenuAccountAddresses } from '../../../components'
import { FormTextField, FormButton } from '@/utils/types'
import { useUserStore, useSnackbarStore, useUserMenuStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore() 
const userMenuStore = useUserMenuStore()
const formError = reactive({ isError: false, message:'' })

const formButton = reactive<FormButton>({
    show: true,
    label: 'Submit',
    class: "text-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        id: 1, 
        model: '', 
        name:'full_name', 
        label: 'Full name', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text', 
        counter: 50,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Full name is required',
            (v: any) => v.length <= 50 || 'Must be 50 characters or less'
        ]
    },
    {
        id: 2, 
        model: '', 
        name:'phone_number', 
        label: 'Phone number', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Phone number is required',
        ]
    },
    {
        id: 3, 
        model: '', 
        name:'street_address', 
        label: 'Street address', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Street address is required',
        ]
    },
    {
        id: 4, 
        model: '', 
        name:'street_address_ext', 
        label: 'Street address ext', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined'
    },
    {
        id: 5, 
        model: 'United States', 
        name:'country', 
        label: 'Country', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        disabled: true
    },
    {
        id: 6, 
        model: '', 
        name:'state', 
        label: 'State', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'State is required',
        ]
    },
    {
        id: 7, 
        model: '', 
        name:'city', 
        label: 'City', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'City is required',
        ]
    },
    {
        id: 8, 
        model: '', 
        name:'postal_code', 
        label: 'Postal code', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Postal code is required',
        ]
    },
])

const submitEmitter = (e: any): void => {
    if (e.status == 'error'){
        if('errors' in e.error.data){
            formError.isError = true
            let errors: string[] = e.error.data.errors
            formError.message = errors.toString()
        }else{
            fields.value.map(x => {
                if(x.name && x.name in e.error.data){ 
                    let errors: string[] = e.error.data[x.name]
                    x.errorMessages = errors
                }
            })
        }
        return 
    }

    fields.value.map(x =>  x.errorMessages = '')
    formError.isError = false
    formError.message = ''
    userStore.user = e.data
    snackbarStore.setSnackbar('Address added', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Add address">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuAccountAddresses"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-container>
        <FormFields
            @submit="submitEmitter"
            :fields="fields" 
            :formButton="formButton"
            :apiPath="`${config.public.API_USER_ADDRESSES}`"
            apiMethod="POST"
        />
        <v-alert
            v-model="formError.isError"
            :closable="true"
            class="mt-4"
            type="error"
            title="Something went wrong"
            rounded="lg"
            :text="formError.message"
            :icon="false"
        />
    </v-container>
</template>