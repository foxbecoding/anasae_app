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
                <div id="start" class="d-flex flex-row align-center">Logo</div>
                <div id="center" class="d-flex flex-row align-center flex-fill">
                    <v-card rounded="xl"></v-card>
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