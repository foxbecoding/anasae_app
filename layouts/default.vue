<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}
</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <div id="start" class="d-flex flex-row align-center">
                    <v-app-bar-title class="title-logo">ANASAE</v-app-bar-title>
                </div>
                <div id="center" class="d-flex flex-row align-center flex-0-1">
                    <v-card rounded="xl" width="500px"  height="44px"></v-card>
                </div>
                <div id="end" class="d-flex flex-row align-center justify-content-end">Toolbar</div>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-card>
                <v-card-actions></v-card-actions>
            </v-card>
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style scoped>
.title-logo {
    background: linear-gradient(to right, #9C27B0, #FFC107);
    /* background: linear-gradient(to right,#3fabf3, #9C27B0); */
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 1.7rem;
}
</style>