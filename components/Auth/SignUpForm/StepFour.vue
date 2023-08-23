<script lang="ts" setup>
import { FormTextField, FormButton, ApiData } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_PASSWORD) 
const apiMethod = 'POST'
const authStore = useAuthStore()

const formError = reactive({
    isError: false,
    message:''
})

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
        model: authStore.signUpForm.password, 
        class: 'flex-1-0-100',
        density: 'comfortable',
        name:'password', 
        label: 'Password', 
        color: 'primary-alt',
        type: 'password', 
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
        rules: [ (v: any) => !! v || 'Password is required' ]
    } as FormTextField,
    {
        id: 2, 
        model: authStore.signUpForm.confirm_password, 
        class: 'flex-1-0-100',
        density: 'comfortable',
        name:'confirm_password', 
        label: 'Confirm password', 
        color: 'primary-alt',
        type: 'password', 
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
        rules: [ (v: any) => !! v || 'Confirm password is required' ]
    } as FormTextField,
]) 

const submitEmitter = async (e: any): Promise<void> => {
    if (e.status == 'error'){
        fields.value.map(x => {
            if(x.name && x.name in e.error.data){ 
                let errors: string[] = e.error.data[x.name]
                x.errorMessages = errors
            }
        })
        return 
    }else {
        fields.value.map(x =>  x.errorMessages = '')
        formError.isError = false
        formError.message = ''
    }

    const signUpData = authStore.signUpForm
    let apiData = {
        confirm_password: signUpData.confirm_password,
        date_of_birth: `${signUpData.birth_month}/${signUpData.birth_day}/${signUpData.birth_year}`,
        email: signUpData.email,
        first_name: signUpData.first_name,
        gender: signUpData.gender,
        last_name: signUpData.last_name,
        password: signUpData.password,
        username: signUpData.username
    }

    let {data, error, status} = await useApi({
        data: apiData,
        method: 'POST',
        path: `${config.public.API_USER}`
    })
    
    if(status.value === 'error'){
        formError.isError = true
        formError.message = 'Please try again.'
        return
    }

    authStore.signUpCompleted = true
    authStore.signUpForm = {
        email: '',
        username: '',
        first_name: '',    
        last_name: '',
        birth_month: null,    
        birth_day: null,    
        birth_year: null,
        otp_code: '',
        password: '', 
        gender: null,   
        confirm_password: ''    
    }
    formError.isError = false
    formError.message = ''
}

</script>

<template>
    <div v-if="!authStore.signUpCompleted">
        <FormFields 
            @submit="submitEmitter"
            formClass="d-flex flex-wrap"
            :store="authStore.signUpForm"
            :fields="fields" 
            :formButton="formButton"
            :apiPath="apiPath"
            :apiMethod="apiMethod"
        />
        <p class="text-center mt-4">By creating an account with us you agree to our 
            <NuxtLink class="text-primary-alt text-decoration-none" to="/terms">
                terms of agreement
            </NuxtLink>.
        </p>
        <v-alert
            v-model="formError.isError"
            :closable="true"
            class="mt-4"
            type="error"
            title="Something went wrong"
            rounded="xl"
            :text="formError.message"
        ></v-alert>
    </div>
    <div class="text-center" v-else>
        <h3 class="text-h5">Account created successfully!</h3>
        <p class="mb-4 text-h6">You can now sign in.</p>
        <div class="nana-primary-bg-color rounded-xl sign-in-btn">
            <v-btn 
                @click="authStore.signUpCompleted = false"
                :to="{name: 'auth-login'}" 
                :replace="true"
                color="surface-el"
                rounded="pill" 
                block 
                flat 
            >
                sign in
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.sign-in-btn:hover{
    cursor: pointer;
}
</style>