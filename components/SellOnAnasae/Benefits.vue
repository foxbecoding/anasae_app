<script setup lang="ts">
import { useAuthStore } from '@/store'

const config = useRuntimeConfig()
const authStore = useAuthStore()
const benefits = shallowRef<string[]>([
    "Access to thousands of customers that are looking for black owned brands and products",
    "Low commission rates",
    "Manange your brand's appearance, inventory, orders, social post and more with our Brand Center",
    "We provide provide prepaid shipping labels for all orders"
])

const GetStartedPath = computed(() => authStore.isAuth ? 'brand-center' : 'auth-sign-up')
const getStarted = (): void => {
    navigateTo({name: GetStartedPath.value})
    authStore.setPrevRouteData(useRoute().fullPath, useRoute().name)
}
</script>

<template>
    <v-container class="mt-4" fluid>
        <h1 class="text-h4 text-sm-h3 font-weight-thin mb-4 px-4 text-center">
            Why use {{ config.public.COMPANY_NAME }}?
        </h1>
    </v-container>
    <v-container>
        <div class="d-block mx-auto" style="max-width: 800px;"> 
            <v-row align="center" class="mb-4">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <div 
                        v-for="(benefit,n) in benefits" 
                        :key="n"
                        class="d-flex mb-3 align-center"
                    >
                        <v-icon color="success" class="pr-4">mdi-check</v-icon>
                        <p>{{ benefit }}</p>
                    </div>
                </v-col>
                <v-divider v-if="!$vuetify.display.xs" vertical/>
                <v-col
                    cols="12"
                    sm="6"
                    class="align-center text-center"
                >
                    
                    <div>
                        Low commission<br>
                        <span class="text-h2">5%</span><br>
                        per sale
                    </div>
                </v-col>
            </v-row>  
            <div class="text-center mt-8">
                <v-btn 
                    class="nana-primary-color"
                    rounded="pill"
                    flat 
                    @click="getStarted()"
                >
                    Get Started
                </v-btn>
            </div>
        </div>
    </v-container>
    
</template>