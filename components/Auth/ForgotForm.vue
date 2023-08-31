<script setup lang="ts">
import { FormTextField, FormButton } from '@/utils/types'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_FORGOT_PASSWORD) 
const apiMethod = 'POST'
const alert = reactive({
    show: false,
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
        model: '', 
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
    }
])

const submitEmitter = async (e: any): Promise<void> => {
    fields.value.map(x =>  x.errorMessages = '')
    alert.show = true
    alert.message = e.data
}

</script>

<template>
    <v-card-title 
        data-test-id="AuthForgotPasswordForm--title"  
        class="text-h5 px-0 mb-2"
    >
        Password assistance
    </v-card-title>
    <FormFields
        @submit="submitEmitter"
        :fields="fields" 
        :formButton="formButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
    <v-alert
        v-model="alert.show"
        :closable="true"
        class="mt-4"
        type="success"
        title=""
        rounded="lg"
        :text="alert.message"
        :icon="false"
    ></v-alert>
</template>