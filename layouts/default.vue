<script setup lang="ts">
import { useTheme } from 'vuetify'
import { AppBarStart, AppBarCenter } from '@/components/AppBar'

const theme = useTheme()

const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => {
    return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
})
</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarStart />
                <AppBarCenter />
                
                <div id="end" class="d-flex flex-row align-center justify-content-end">
                    <v-toolbar color="background">
                        <nana-app-bar-btn 
                            @click="toggleTheme()"
                            class="rounded-xl mr-2"
                            variant="plain"
                            height="38px"
                            width="38px"
                            icon
                        >
                            <v-icon>{{ THEME_ICON }}</v-icon>
                        </nana-app-bar-btn>
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
            </v-container>
        </v-app-bar>
        <v-main class="pt-16">
            <slot></slot>
        </v-main>
    </v-app>
</template>