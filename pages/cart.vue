<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()

var cartPks = cartStore.cart.map(x => x.pk)
console.log(cartPks.toString())
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <v-container class="px-sm-8" fluid>
                <h1>Cart</h1>
                {{ cartStore.cart }}
            </v-container>
        </NuxtLayout>
    </div>
</template>