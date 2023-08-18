<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useAuthStore, useUserStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
const theme = useTheme()        
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')

</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <NanaAppBarBtn
            v-if="!authStore.isAuth" 
            data-test-id="app-bar-inner-end-sign-btn" 
            class="rounded-xl" 
            active
            @click="`${authStore.prevRoute = $route.fullPath}`"
            :to="{name: 'auth-login'}"
        >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
            Sign In
        </NanaAppBarBtn>
        <div 
            v-if="authStore.isAuth" 
            class="nana-primary-bg-color rounded-xl d-none d-md-block"
        >
            <v-btn 
                value="add"
                class="rounded-xl background-bg" 
                height="34" 
                width="34"
                min-width="34" 
                variant="flat" 
                icon
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <NanaAppBarBtn 
            v-if="authStore.isAuth"
            :to="{ path: `/profile/${userStore.user.uid}` }"
            data-test-id="app-bar-inner-end-profile-btn"
            class="rounded-xl ml-2"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>mdi-account-circle-outline</v-icon>
        </NanaAppBarBtn>
        
        <NanaAppBarBtn 
            v-if="!authStore.isAuth"
            data-test-id="app-bar-inner-end-theme-toggle-btn"       
            @click="toggleTheme()" 
            class="rounded-xl ml-2 d-none d-sm-block"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>{{ THEME_ICON }}</v-icon>
        </NanaAppBarBtn>

        <NanaAppBarBtn
            data-test-id="app-bar-inner-end-cart-btn" 
            class="rounded-xl d-none d-md-flex ml-2"
            :to="{name: 'cart'}"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>mdi-cart-outline</v-icon>
        </NanaAppBarBtn>   
    </div>
</template>