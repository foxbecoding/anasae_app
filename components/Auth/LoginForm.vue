<script setup lang="ts">
import { FormTextField, FormButton } from '@/utils/types'
import { useAuthStore, useUserStore, useSnackbarStore, useBrandStore } from "@/store"

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_LOGIN) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore()
const switchModel = ref<boolean>(authStore.loginForm.isUsername)
const formError = reactive({
    isError: false,
    message:''
})

const EmailOrUsername = computed((): string => authStore.loginForm.isUsername ? authStore.loginForm.username : authStore.loginForm.email)

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
        model: EmailOrUsername.value, 
        name:'email', 
        label: 'Email', 
        density: 'comfortable',
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
        density: 'comfortable',
        color: 'primary-alt',
        type:'password', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
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

const switchHandler = (e: boolean|any): void => {
    let field = fields.value.find(x => x.id === 1)
    if(e && field){
        authStore.loginForm.isUsername = true
        field.model = authStore.loginForm.username
        field.name = 'username'
        field.label = 'Username'
        field.prependInnerIcon = 'mdi-account'
        field.rules = [ (v: string) => !! v || 'Username is required' ]
    }else if(!e && field){
        authStore.loginForm.isUsername = false
        field.model = authStore.loginForm.email
        field.name = 'email'
        field.label = 'Email'
        field.prependInnerIcon = 'mdi-email'
        field.rules = [
            (v: string) => !! v || 'E-mail is required',
            (v: string) => /.+@.+\..+/.test(v)  || 'E-mail must be valid'
        ]
    }
}

const submitEmitter = async (e: any): Promise<void> => {
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
    authStore.isAuth = true
    authStore.loginForm = {
        email: '',
        username: '',
        password: '',
        isUsername: false
    }
    useRouter().replace({ path: authStore.prevRoute })
    userStore.user = e.data
    snackbarStore.setSnackbar('Signed in', true)
    await userStore.user.owned_brands
    useBrandStore().brands = await useGetOwnerBrands(userStore.user.owned_brands)
}

onMounted(() => {
    switchHandler(authStore.loginForm.isUsername)
})

</script>

<template>
    <v-card-title 
        data-test-id="AuthLoginForm--title"  
        class="text-h5 px-0 mb-2"
    >
        Login
    </v-card-title>
    <FormFields
        @submit="submitEmitter"
        :store="authStore.loginForm"
        :fields="fields" 
        :formButton="formButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
    <v-switch
        data-test-id="AuthLoginForm--switch" 
        v-model="switchModel"
        class="mt-4"
        color="primary-alt"
        @update:modelValue="switchHandler"
        hide-details
        density="compact"
        inset
        :centerAffix="false"
        :label="`Login with: ${switchModel ? 'username' : 'email'}`"
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
    <p 
        data-test-id="AuthLoginForm--have-an-account" 
        class="py-8"
    >
        Don't have an account? 
        <NuxtLink 
            data-test-id="AuthLoginForm--have-an-account-link"
            :to="{name: 'auth-sign-up' }"
            class="text-decoration-none text-primary-alt" 
        >
            Sign Up
        </NuxtLink>
    </p>
</template>