<script setup lang="ts">
import { useBrandStore } from '@/store'
definePageMeta({
  layout: 'brand-center-layout'
})
useBrandStore().middleware()
</script>

<template>
    <v-container class="pa-sm-8" fluid>
        <BrandCenterProductsListing />
    </v-container>
</template>