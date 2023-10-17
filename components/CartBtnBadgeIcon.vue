<script lang="ts" setup>
import { useCartStore } from '@/store'

const cartStore = useCartStore()
</script>

<template>
    <v-badge
        color="primary-alt"
        :dot="cartStore.cart.length == 0"
        :content="cartStore.cart.length"
    >
        <v-icon>mdi-cart</v-icon>
    </v-badge>
</template>