<script setup lang="ts">
import { useAuthStore } from '@/store/Auth'
import { 
    AuthSignUpFormStepOne, 
    AuthSignUpFormStepTwo 
} from '@/components/Auth/SignUpForm/components'

const authStore = useAuthStore()
const signUpSteps = shallowRef([ 
    { id: 1, component: AuthSignUpFormStepOne }, 
    { id: 2, component: AuthSignUpFormStepTwo } 
])
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