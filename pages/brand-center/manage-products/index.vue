<script setup lang="ts">
import { useBrandStore } from '@/store'
useBrandStore().middleware()
</script>

<template>
    <v-container class="px-sm-8" fluid>
        <h1>Manage products</h1>
        <BrandCenterProducts />
    </v-container>
</template>