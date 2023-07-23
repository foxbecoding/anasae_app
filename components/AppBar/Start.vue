<script setup lang="ts">
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const theme = useTheme()
const LOGO = computed<string>((): string => theme.global.current.value.dark ? 'logo-dark-v1' : 'logo-light-v1')

</script>

<template>
    <div id="start" class="d-flex flex-row align-center">
        <v-img :src="`${config.public.CDN_MEDIA_URL}/assets/${LOGO}.png`" width="120" />
    </div>
</template>