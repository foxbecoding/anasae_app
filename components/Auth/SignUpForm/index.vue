<script setup lang="ts">
import { UserGender } from '@/utils/types'
import { useAuthStore } from '@/store'
import * as authSteps from '@/components/Auth/SignUpForm/components'

const config = useRuntimeConfig()
const authStore = useAuthStore()
const signUpSteps = shallowRef([ 
    { id: 1, component: authSteps.AuthSignUpFormStepOne }, 
    { id: 2, component: authSteps.AuthSignUpFormStepTwo }, 
    { id: 3, component: authSteps.AuthSignUpFormStepThree }, 
    { id: 4, component: authSteps.AuthSignUpFormStepStepFour } 
])

const setUserGenders = async (): Promise<void> => {
    if (authStore.signUpFormGenderOptions.length === 0){
        let {data, status, error, refresh} = await useApi({
            method: 'GET',
            path: `${config.public.API_USER_GENDER}`
        })
        const genderOptions = data.value as UserGender[]
        genderOptions.map(x => authStore.signUpFormGenderOptions.push({ id: x.pk, title: x.gender, value: x.pk })) 
    }
}

onMounted(() => {  setUserGenders() })

</script>

<template>
    <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 px-0">
            Sign Up
        </v-card-title>
        <h3 class="text-h6 px-0">
            Step {{ authStore.signUpFormStep }} of 4
        </h3>
    </div>
    <v-window v-model="authStore.signUpFormStep">
        <v-window-item 
            v-for="(step, s) in signUpSteps" 
            :key="step.id"
            :value="step.id"
            class="mt-2"
        >
            <component :is="step.component" />
        </v-window-item>
    </v-window>
    <p v-if="authStore.signUpFormStep == 1" class="py-8">Have an account? 
        <NuxtLink 
            :to="{name: 'auth-login' }"
            class="text-decoration-none text-primary-alt" 
        >
            Login
        </NuxtLink>
    </p>
</template>