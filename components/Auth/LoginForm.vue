<script setup lang="ts">
import { FormField } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_LOGIN) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const switchModel = ref<boolean>(authStore.loginForm.isUsername)
const formError = reactive({
    isError: false,
    message:''
})

const EmailOrUsername = computed((): string => authStore.loginForm.isUsername ? authStore.loginForm.username : authStore.loginForm.email)

const fields = ref<FormField[]>([
    {
        id: 1, 
        model: EmailOrUsername.value, 
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
        model: authStore.loginForm.password, 
        name:'password', 
        label: 'Password', 
        color: 'primary-alt',
        type:'password', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-lock',
        rules: [ (v: any) => !! v || 'Password is required' ],
    }
])

const switchHandler = (e: boolean|any): void => {
    let field = fields.value.find(x => x.id === 1)
    if(e && field){
        authStore.loginForm.isUsername = true
        field.model = authStore.loginForm.username
        field.name = 'username'
        field.label = 'Username'
        field.prependInnerIcon = 'mdi-account'
        field.rules = [
            (v: any) => !! v || 'Username is required'
        ]
    }else if(!e && field){
        authStore.loginForm.isUsername = false
        field.model = authStore.loginForm.email
        field.name = 'email'
        field.label = 'E-mail'
        field.prependInnerIcon = 'mdi-email'
        field.rules = [
            (v: any) => !! v || 'E-mail is required',
            (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ]
    }
}

const formSubmission = (e: any): void => {

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

onMounted(() => {
    switchHandler(authStore.loginForm.isUsername)
})

</script>

<template>
    <v-card-title class="text-h5 px-0">
        Login
    </v-card-title>
    <FormFields 
        @submit="formSubmission"
        isSubmitBtn 
        :store="authStore.loginForm"
        :fields="fields" 
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
    <v-switch
        v-model="switchModel"
        class="mt-4"
        color="primary-alt"
        @update:modelValue="switchHandler"
        hide-details
        density="compact"
        inset
        :centerAffix="false"
        :label="`Login with: ${switchModel ? 'email' : 'username'}`"
    ></v-switch>
    <v-alert
        v-model="formError.isError"
        :closable="true"
        class="mt-4"
        type="error"
        title="Something went wrong"
        rounded="xl"
        :text="formError.message"
        :icon="false"
    ></v-alert>
    <p class="py-8">Don't have an account? 
        <NuxtLink 
            :to="{name: 'auth-sign-up' }"
            class="text-decoration-none text-primary-alt" 
        >
            Sign Up
        </NuxtLink>
    </p>
</template>