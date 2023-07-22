<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

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
            <nana-app-bar-btn 
                @click="toggleTheme()" 
                class="rounded-xl mr-2"
                height="38px"
                width="38px"
                icon
            >
                <v-icon>{{ THEME_ICON }}</v-icon>
            </nana-app-bar-btn>

            <div class="nana-primary-bg-color rounded-xl">
                <NanaBtnOutlined
                    class="rounded-xl"
                >
                    <v-icon class="mr-2" >mdi-account-circle-outline</v-icon>
                    Sign In
                </NanaBtnOutlined>
            </div>
        </v-toolbar>
    </div>
</template>