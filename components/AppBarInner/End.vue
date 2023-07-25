<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'

const theme = useTheme()
const { name } = useDisplay()        
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => {
    return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
})

const SIGN_IN_BTN_HEIGHT = computed((): string => name.value == 'xs' ? '30px' : '38px')

</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <div class="nana-primary-bg-color rounded-xl mr-2">
            <NanaBtnOutlined class="rounded-xl" :height="SIGN_IN_BTN_HEIGHT">
                <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
                Sign In
            </NanaBtnOutlined>
        </div>
        
        <div class="d-none d-sm-block">
            <nana-app-bar-btn 
                @click="toggleTheme()" 
                class="rounded-xl mr-2 surface-bg"
                height="38px"
                width="38px"
                icon
            >
                <v-icon>{{ THEME_ICON }}</v-icon>
            </nana-app-bar-btn>

            <nana-app-bar-btn 
                class="rounded-xl surface-bg"
                height="38px"
                width="38px"
                icon
            >
                <v-icon>mdi-cart-outline</v-icon>
            </nana-app-bar-btn> 
        </div>           
    </div>
</template>