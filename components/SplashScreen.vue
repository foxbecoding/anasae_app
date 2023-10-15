<script lang="ts" setup>
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
    <img class="logo" width="240px" :src="Logo"/>
</template>

<style scoped>
.logo{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>