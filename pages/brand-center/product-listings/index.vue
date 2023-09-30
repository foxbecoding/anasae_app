<script setup lang="ts">
import { useBrandStore } from '@/store'
useBrandStore().middleware()
</script>

<template>
    <v-container class="pa-sm-8" fluid>
        <BrandCenterProducts />
    </v-container>
</template>