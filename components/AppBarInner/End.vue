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
        <NanaAppBarBtn  class="rounded-xl mr-2" >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
            Sign In
        </NanaAppBarBtn>
          
        <NanaAppBarBtn 
            @click="toggleTheme()" 
            class="rounded-xl mr-2 d-none d-sm-block"
            height="38px"
            width="38px"
            icon
        >
            <v-icon>{{ THEME_ICON }}</v-icon>
        </NanaAppBarBtn>

        <NanaAppBarBtn 
            class="rounded-xl d-none d-md-block"
            height="38px"
            width="38px"
            icon
        >
            <v-icon>mdi-cart-outline</v-icon>
        </NanaAppBarBtn>   
    </div>
</template>