<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
const props = defineProps({
    title: Boolean,
    description: Boolean,
    images: Boolean,
    price: Boolean,
    quantity: Boolean,
    sku: Boolean,
    specifications: Boolean,
})

const store = useBrandCenterProductListingStore()


</script>

<template></template>