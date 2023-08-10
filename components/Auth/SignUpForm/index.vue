<script setup lang="ts">
import { useAuthStore } from '@/store/Auth'

const authStore = useAuthStore()

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
        <v-window-item :value="1">
            <AuthSignUpFormStepOne class="mt-2"/>
        </v-window-item>
        <v-window-item :value="2">
            2
        </v-window-item>
        <v-window-item :value="3">
            3
        </v-window-item>
        <v-window-item :value="4">
            4
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