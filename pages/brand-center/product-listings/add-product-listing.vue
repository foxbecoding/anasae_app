<script setup lang="ts">
import { useBrandStore } from '@/store'

useBrandStore().middleware()
</script>

<template>
  <div>
    <NuxtLayout name="brand-center-layout">
      <v-container class="pa-0" fluid>
        <BrandCenterProductsAdd />
      </v-container>
    </NuxtLayout>
  </div>
</template>