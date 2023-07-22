<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const toggleTheme = (): void => {
    console.log(theme.global.current.value.dark)
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
    // theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
    <v-app>
        <v-main>
            <nana-btn @click="toggleTheme()" color="surface" :flat="true">TEST</nana-btn>
            <nana-btn @click="toggleTheme()" color="surface-alt" :flat="true">TEST</nana-btn>
            <slot></slot>
        </v-main>
    </v-app>
</template>