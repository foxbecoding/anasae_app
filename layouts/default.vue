<script setup lang="ts">
const nn = useRuntimeConfig()
</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarStart />
                <AppBarCenter />
                <AppBarEnd />
                
            </v-container>
        </v-app-bar>
        <v-main class="pt-16">
            <slot></slot>
        </v-main>
    </v-app>
</template>