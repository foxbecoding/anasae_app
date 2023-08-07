<script setup lang="ts">
import { FormField } from '@/utils/types'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_LOGIN) 
const apiMethod = 'POST'

const fields = ref<FormField[]>([
    {
        id: 1, 
        model: '', 
        name:'email', 
        label: 'E-mail', 
        color: 'input-field-primary',
        type: 'text', 
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
        model: '', 
        name:'password', 
        label: 'Password', 
        color: 'input-field-primary',
        type:'password', 
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-lock',
        rules: [ (v: any) => !! v || 'Password is required' ],
    }
])

const formSubmission = (e: any): void => {
    // if(e.error) {
    //     console.log(e.error)
    //     formError.show = true
    //     formError.message = e.error
    //     return 
    // }

    // if(e.data.access_denied){
    //     formError.show = true
    //     formError.message  = e.data.access_denied[0]
    //     return 
    // }

    // formError.show = false
    // formError.message = ''
    // adminStore.set_auth_data(e.data, true)
    // router.replace('/dashboard')
}
</script>

<template>
    <FormFields 
        @submit="formSubmission"
        isSubmitBtn 
        :fields="fields" 
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
    <p>Don't have an account? 
        <NuxtLink :to="{name: 'auth-sign-up' }">Sign Up</NuxtLink>
    </p>
</template>