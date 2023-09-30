<script setup lang="ts">
import { useBrandStore } from '@/store'
useBrandStore().middleware()
</script>

<template>
    <v-container class="pa-0" fluid>
        <BrandCenterProductsAdd />
    </v-container>
</template>