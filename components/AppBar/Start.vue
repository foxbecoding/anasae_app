<script setup lang="ts">
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const theme = useTheme()
const LOGO = computed<string>((): string => theme.global.current.value.dark ? 'logo-dark' : 'logo-light')

</script>

<template>
    <div id="start" class="d-flex flex-row align-center">
        <v-img :src="`${config.public.CDN_MEDIA_URL}/${LOGO}.png`" width="120" />
        <v-app-bar-title v-if="false" class="nana-logo-title">ANASAE</v-app-bar-title>
    </div>
</template>