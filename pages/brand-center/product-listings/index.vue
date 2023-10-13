<script setup lang="ts">
import { useBrandStore } from '@/store'

useBrandStore().middleware()
</script>

<template>
  <div>
      <NuxtLayout name="brand-center-layout">
        <v-container class="pa-sm-8" fluid>
          <BrandCenterProducts />
        </v-container>
      </NuxtLayout>
  </div>
</template>