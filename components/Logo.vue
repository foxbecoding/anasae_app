<script setup lang="ts">
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const theme = useTheme()
const LOGO = computed<string>((): string => theme.global.current.value.dark ? 'logo-dark' : 'logo-light')

</script>

<template>
    <v-img :src="`${config.public.CDN_MEDIA_URL}/assets/${LOGO}.png`" width="120" />
</template>