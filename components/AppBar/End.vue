<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
        
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => {
    return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
})
</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <v-toolbar color="background">
            <div class="nana-primary-bg-color rounded-xl">
                <nana-app-bar-btn 
                    class="rounded-xl"
                    variant="plain" 
                >
                    <v-icon class="mr-2" >mdi-account-circle</v-icon>
                    Sign In
                </nana-app-bar-btn>
            </div>
        </v-toolbar>
    </div>
</template>