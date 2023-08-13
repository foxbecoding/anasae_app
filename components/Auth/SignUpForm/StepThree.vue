<script lang="ts" setup>
import { useAuthStore } from '@/store/Auth'

const config = useRuntimeConfig()
const authStore = useAuthStore()
const form = ref()
const isFormValid = ref<boolean>(true)
const otp = ref('')
const otpPk = ref('')
const isOtpCodeFinish = ref(false)
const isOtpRequest = ref<boolean>(false)
const isValidatingOtp = ref<boolean>(false)
const requestCodeTimer = ref<number>(30)
const requestCodeBtnLabel = ref<string>('request code')
const isRequestCodeBtnDisabled = ref<boolean>(false)
const formError = reactive({
    isError: false,
    message:''
})

const setRequestCodeTimer = () => {
    requestCodeBtnLabel.value = 'Request again in'
    isRequestCodeBtnDisabled.value = true
    var interval = setInterval(function(){
        requestCodeTimer.value--
        if (requestCodeTimer.value === 0){ 
            clearInterval(interval) 
            requestCodeTimer.value = 30
            isRequestCodeBtnDisabled.value = false
            requestCodeBtnLabel.value = 'Request code'
        }
    }, 1000);
}

const RequestCodeTimer = computed(() => requestCodeTimer.value)

const requestOtp = async () => {
    const { data, pending, error, refresh, status } = await useApi({
        method: 'POST',
        path: config.public.API_AUTH_VERIFY_EMAIL,
        data: {email: authStore.signUpForm.email}
    })
  
    if (status.value == 'error'){
        formError.isError = true
        formError.message = 'Please try again.'
        return 
    }

    otpPk.value = data.value.pk
    isOtpRequest.value = true
    formError.isError = false
    formError.message = ''
    setRequestCodeTimer()
}

const validateCode = async () => {
    isValidatingOtp.value = true
    const { data, pending, error, refresh, status } = await useApi({
        method: 'PUT',
        path: `${config.public.API_AUTH_VERIFY_EMAIL}/${otpPk.value}/`,
        data: {
            email: authStore.signUpForm.email,
            otp_code: otp.value,
            pk: otpPk.value
        }
    })
  
    if (status.value == 'error'){
        formError.isError = true
        formError.message = 'Please try again.'
        isValidatingOtp.value = false
        return 
    }
    
    authStore.signUpFormStep++
    isValidatingOtp.value = false
    formError.isError = false
    formError.message = ''
}

</script>

<template>
    <div class="text-center">
        <h3 class="text-h5">Verify your email</h3>
        <p>{{ authStore.signUpForm.email }}</p>
        <p>Request a code and we will send it to your email.</p>
    </div>
    <v-form 
        ref="form"
        v-model="isFormValid"
        lazy-validation
    >
        <v-otp-input
            v-model="otp"
            @finish="isOtpCodeFinish = true"
        ></v-otp-input>
    </v-form>
    <v-btn 
        @click="requestOtp()"
        class="d-block mx-auto"   
        color="primary-alt" 
        rounded="pill"
        variant="outlined"
        flat
        :disabled="isRequestCodeBtnDisabled"
    >
        {{ !isRequestCodeBtnDisabled ? requestCodeBtnLabel : requestCodeBtnLabel+' '+RequestCodeTimer }}
    </v-btn>
    <p class="text-center mt-2 mb-4">
        Didn't receive a code? Please try again.
    </p>
    
    <v-btn
        @click="isOtpRequest && isOtpCodeFinish ? validateCode() : ''"
        rounded="pill"
        color="primary"
        block
        :loading="isValidatingOtp"
        :disabled="!isOtpRequest  || !isOtpCodeFinish"
    >
        Next
    </v-btn>
    <v-alert
        v-model="formError.isError"
        :closable="true"
        class="mt-4"
        type="error"
        title="Something went wrong"
        rounded="xl"
        :text="formError.message"
    ></v-alert>
</template>