<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()        
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')

</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <NanaAppBarBtn 
            data-test-id="app-bar-inner-end-sign-btn" 
            class="rounded-xl" 
            active
            :to="{name: 'auth-login'}"
        >
            <VIcon class="mr-2">mdi-account-circle-outline</VIcon>
            Sign In
        </NanaAppBarBtn>
          
        <NanaAppBarBtn 
            data-test-id="app-bar-inner-end-theme-toggle-btn"       
            @click="toggleTheme()" 
            class="rounded-xl ml-2 d-none d-sm-block"
            height="38px"
            width="38px"
            icon
            active
        >
            <VIcon>{{ THEME_ICON }}</VIcon>
        </NanaAppBarBtn>

        <NanaAppBarBtn
            data-test-id="app-bar-inner-end-cart-btn" 
            class="rounded-xl d-none d-md-block ml-2"
            height="38px"
            width="38px"
            icon
            active
        >
            <VIcon>mdi-cart-outline</VIcon>
        </NanaAppBarBtn>   
    </div>
</template>