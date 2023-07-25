<script setup lang="ts">
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const theme = useTheme()
const Icon = computed<string>((): string => `${config.public.CDN_MEDIA_URL}/assets/icon-dark-v1.png`) 
</script>

<template>
    <v-card 
        class="w-100 surface-bg"
        rounded="pill" 
        height="44px"
        density="compact"
    >
        <v-form>
            <v-text-field
                density="compact"
                flat
                placeholder="Search for products & brands"
                variant="solo-filled" 
                append-inner-icon="mdi-magnify"
                bg-color="transparent"
            >
                <template v-slot:prepend-inner>
                    <v-img :src="Icon" width="24"/>
                </template>
            </v-text-field>
        </v-form>
        
    </v-card> 
</template>