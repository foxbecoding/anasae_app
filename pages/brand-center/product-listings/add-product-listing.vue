<script setup lang="ts">
import { useBrandStore } from '@/store'
definePageMeta({
  layout: 'brand-center-layout'
})
useBrandStore().middleware()
</script>

<template>
    <v-container class="pa-0" fluid>
        <BrandCenterProductsAdd />
    </v-container>
</template>