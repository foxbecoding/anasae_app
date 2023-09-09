<script setup lang="ts">

const config = useRuntimeConfig()
</script>

<template>
    <v-container fluid>
        <h1 class="text-h4 text-sm-h2 font-weight-thin mb-4 px-4 text-center">
            Why use {{ config.public.COMPANY_NAME }}?
        </h1>
    </v-container>
    <v-container>
    </v-container>
</template>