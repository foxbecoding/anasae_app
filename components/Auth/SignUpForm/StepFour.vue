<script lang="ts" setup>
import { FormTextField, FormButton } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_PASSWORD) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const isSignUpComplete = ref<boolean>(false)

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


const submitEmitter = (e: any): void => {
    if (e.status == 'error'){
        fields.value.map(x => {
            if(x.name && x.name in e.error.data){ 
                let errors: string[] = e.error.data[x.name]
                x.errorMessages = errors
            }
        })
        return 
    }

    console.log()
    fields.value.map(x =>  x.errorMessages = '')
    formError.isError = false
    formError.message = ''
}

</script>

<template>
    <div v-if="!isSignUpComplete">
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
            <NuxtLink class="text-primary-alt text-decoration-none" to="#">
                terms of agreement
            </NuxtLink>.
        </p>
    </div>
    <div class="text-center" v-else>
        <h3 class="text-h5">Account created successfully!</h3>
        <p class="mb-4 text-h6">You can now sign in.</p>
        <div class="nana-primary-bg-color rounded-xl sign-in-btn">
            <v-btn 
                :to="{name: 'auth-login'}" 
                color="background"
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