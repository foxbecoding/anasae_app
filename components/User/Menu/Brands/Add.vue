<script lang="ts" setup>
import { useUserMenuStore, useSnackbarStore, useBrandStore, useUserStore } from '@/store'
import UserMenuBrands  from './index.vue'
import { FormTextField, FormButton } from '@/utils/types'

const config = useRuntimeConfig()
const userMenuStore = useUserMenuStore()
const snackbarStore = useSnackbarStore()
const brandStore = useBrandStore()
const formError = reactive({ isError: false, message:'' })

const formButton = reactive<FormButton>({
    show: true,
    label: 'Submit',
    class: "tex-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        flat: true,
        id: 1, 
        model: '', 
        name:'name', 
        label: 'Brand name', 
        density: 'comfortable',
        color: 'primary',
        counter: 30,
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        rules: [ 
            (v: any) => !! v || 'Brand name is required', 
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ],
    },
    
    {
        bgColor: 'form-field-flat',
        flat: true,
        id: 2, 
        model: '', 
        name:'bio', 
        label: 'Bio', 
        density: 'comfortable',
        color: 'primary',
        counter: 300,
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTAREA',
        variant: 'solo',
        rules: [ 
            (v: any) => !! v || 'Bio is required',
            (v: any) => v.length <= 300 || 'Must be 300 characters or less'
        ],
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
    userMenuStore.selectedView = UserMenuBrands
    brandStore.brands.push(e.data)
    useUserStore().init()
    snackbarStore.setSnackbar('Brand added', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Add brand">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuBrands"
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
            :apiPath="`${config.public.API_BRAND}`"
            apiMethod="POST"
        />
        <p class="text-center mt-4 text-caption">By adding your brand you agree to our 
            <NuxtLink 
                @click="userMenuStore.close"
                class="text-primary-alt text-decoration-none" 
                to="/terms"
            >
                terms of agreement.
            </NuxtLink>
        </p>
        <v-alert
            v-model="formError.isError"
            :closable="true"
            class="mt-4"
            type="error"
            title="Something went wrong"
            rounded="xl"
            :text="formError.message"
        />
    </v-container>    
</template>

