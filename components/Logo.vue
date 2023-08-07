<script setup lang="ts">
import { useTheme } from 'vuetify'

const dirPath = ref<string>('/assets/')
const config = useRuntimeConfig()
const theme = useTheme()
const Logo = computed<string>((): string => {
    const theme_color = theme.global.current.value.dark ? `${dirPath.value}logo-dark-v1.png` : `${dirPath.value}logo-light-v1.png`
    return `${config.public.CDN_MEDIA_URL}${theme_color}`
})

</script>

<template>
    <v-img 
        id="logo" 
        data-test-id="logo"
        :src="Logo" 
        alt="Anasae logo" 
    />
</template>

<style scoped>

</style>