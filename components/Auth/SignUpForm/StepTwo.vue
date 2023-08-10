<script lang="ts" setup>
import { FormField, FormFieldButton } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_DETAILS) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const formError = reactive({
    isError: false,
    message:''
})

const fieldButton = reactive<FormFieldButton>({
    show: true,
    label: 'Next',
    class: "tex-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
})

const fields = ref<FormField[]>([
    {
        id: 1, 
        model: authStore.signUpForm.first_name, 
        name:'first_name', 
        label: 'First name', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'First name is required' ]
    },
    {
        id: 2, 
        model: authStore.signUpForm.last_name, 
        name:'last_name', 
        label: 'Last name', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'Last name is required' ]
    }
])

const submitEmitter = (e: any): void => {
    authStore.signUpFormStep++
    if (e.status == 'error'){
        if('errors' in e.error.data){
            formError.isError = true
            let errors: string[] = e.error.data.errors
            formError.message = errors.toString()
        }else{
            fields.value.map(x => {
                if(x.name in e.error.data){ 
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
}
</script>

<template>
    <FormFields 
        @submit="submitEmitter"
        :store="authStore.signUpForm"
        :fields="fields" 
        :fieldButton="fieldButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
</template>