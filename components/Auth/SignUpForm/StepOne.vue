<script lang="ts" setup>
import { FormField, FormButton } from '@/utils/types'
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
})

const fields = ref<FormField[]>([
    {
        id: 1, 
        model: authStore.signUpForm.email, 
        name:'email', 
        label: 'E-mail', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-email',
        rules: [
            (v: any) => !! v || 'E-mail is required',
            (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
    },
    {
        id: 2, 
        model: authStore.signUpForm.username, 
        name:'username', 
        label: 'Username', 
        color: 'primary-alt',
        type:'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'Username is required' ],
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
    // adminStore.set_auth_data(e.data, true)
    // router.replace('/dashboard')
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