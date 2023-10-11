<script lang="ts" setup>
import { useProductListingStore } from '@/store'

const productListingStore = useProductListingStore()
</script>

<template>
    <h1>{{productListingStore.listing.title}}</h1>
</template>