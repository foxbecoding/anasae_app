<script setup lang="ts">
import { useTheme } from 'vuetify'
const dir_path = ref<string>('/assets/')
const config = useRuntimeConfig()
const theme = useTheme()
const Logo = computed<string>((): string => {
    const theme_color = theme.global.current.value.dark ? `${dir_path.value}logo-dark-v1.png` : `${dir_path.value}logo-light-v1.png`
    return `${config.public.CDN_MEDIA_URL}${theme_color}`
})
</script>

<template>
    <NuxtLink :to="{name: 'clipz'}" class="w-100">
        <v-img 
            id="logo" 
            data-test-id="logo"
            :src="Logo" 
            alt="Anasae logo" 
        />
    </NuxtLink>
</template>

<style scoped>
#logo:hover { cursor: pointer; }
</style>