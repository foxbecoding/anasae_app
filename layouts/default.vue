<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}
</script>

<template>
    <v-app>
        <!-- <v-container></v-container> -->
        <v-app-bar>
            <v-container class="px-4" fluid>LOGO</v-container>
        </v-app-bar>
        <v-main>
            <v-card>
                <v-card-actions></v-card-actions>
            </v-card>
            <slot></slot>
        </v-main>
    </v-app>
</template>