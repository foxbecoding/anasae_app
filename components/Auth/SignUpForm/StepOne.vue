<script lang="ts" setup>
import { FormTextField, FormButton } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE) 
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
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        color: 'primary-alt',
        density: 'comfortable',
        errorMessages: '',
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'Email', 
        model: authStore.signUpForm.email, 
        name:'email', 
        prependInnerIcon: 'mdi-email',
        rules: [
            (v: any) => !! v || 'E-mail is required',
            (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        type: 'text', 
        variant: 'outlined',
    },
    {
        color: 'primary-alt',
        counter: 30,
        density: 'comfortable',
        errorMessages: '',
        id: 2, 
        inputType: 'TEXTFIELD',
        label: 'Username', 
        model: authStore.signUpForm.username, 
        name:'username', 
        prependInnerIcon: 'mdi-account',
        rules: [ 
            (v: any) => !! v || 'Username is required', 
            (v: any) => v.length <= 30 || 'Must be 30 characters or less', 
            (v: any) => /^\w+$/.test(v) || 'Only letters, numbers and underscores allowed' 
        ],
        type:'text', 
        variant: 'outlined',
    }
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

    authStore.signUpFormStep++
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
        :formButton="formButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
</template>