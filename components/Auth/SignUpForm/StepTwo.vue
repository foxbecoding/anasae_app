<script lang="ts" setup>
import { FormField, FormButton } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_DETAILS) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const formError = reactive({
    isError: false,
    message:''
})

const formButton = reactive<FormButton>({
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
        class: 'flex-1-0-100',
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
        class: 'flex-1-0-100',
        name:'last_name', 
        label: 'Last name', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'Last name is required' ]
    },
    {
        id: 3, 
        class: 'flex-1-0-100 mt-3 mb-2',
        inputType: 'FORMTEXT',
        formText: 'This information is only used as confirmation and will not be displayed publicly.'
    },
    {
        id: 4, 
        inputType: 'SELECT',
        class: 'flex-1-0', 
        model: authStore.signUpForm.birth_month,
        label: "Month",
        items: [],
        // itemTitle: "field.itemTitle",
        // itemValue: "field.itemValue",
        color: "primary-alt",
        variant: 'outlined'
    },
    {
        id: 5, 
        inputType: 'SELECT',
        class: 'flex-1-0 px-1', 
        model: authStore.signUpForm.birth_day,
        label: "Day",
        items: [],
        // itemTitle: "field.itemTitle",
        // itemValue: "field.itemValue",
        color: "primary-alt",
        variant: 'outlined'
    },
    {
        id: 6, 
        inputType: 'SELECT',
        class: 'flex-1-0', 
        model: authStore.signUpForm.birth_year,
        label: "Year",
        items: [],
        // itemTitle: "field.itemTitle",
        // itemValue: "field.itemValue",
        color: "primary-alt",
        variant: 'outlined'
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
}
</script>

<template>
    <FormFields 
        @submit="submitEmitter"
        formClass="d-flex flex-wrap"
        :store="authStore.signUpForm"
        :fields="fields" 
        :formButton="formButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
</template>