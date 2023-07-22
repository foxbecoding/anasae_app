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
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <div id="start" class="d-flex flex-row align-center">
                    <v-app-bar-title class="title-logo">ANASAE</v-app-bar-title>
                </div>
                <div id="center" class="d-flex flex-row align-center flex-0-1">
                    <v-toolbar color="background">
                        <v-card rounded="xl" width="400px" height="44px">
                            <v-text-field
                                density="compact"
                                flat
                                placeholder="Search for products, brands or clipz"
                                variant="solo-filled" 
                            />
                        </v-card> 
                    </v-toolbar>
                </div>
                <div id="end" class="d-flex flex-row align-center justify-content-end">
                    <v-toolbar color="background">
                        <nana-app-bar-btn 
                            @click="toggleTheme()"
                            class="rounded-xl mr-2"
                            variant="plain"
                            height="36px"
                            width="36px"
                            icon
                        >
                            <v-icon>{{ THEME_ICON }}</v-icon>
                        </nana-app-bar-btn>
                        <nana-app-bar-btn 
                            class="rounded-xl"
                            variant="plain" 
                        >
                            <v-icon>mdi-account-circle</v-icon>
                            Sign In
                        </nana-app-bar-btn>
                    </v-toolbar>
                </div>
            </v-container>
        </v-app-bar>
        <v-main>
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style scoped>
.title-logo {
    /* background: linear-gradient(to right, #9C27B0, #3fabf3); */
    background: linear-gradient(to right, #9C27B0, #FFC107);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 1.7rem;
}
</style>